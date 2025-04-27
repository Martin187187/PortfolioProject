import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = process.env.REACT_APP_API_URL || "/api";

interface Challenge {
    id: string;
    word1: string;
    word2: string;
    hint: string;
}

export interface AnswerResponse {
    correct: boolean;
    hint: string;
    correct_word?: string;
}

interface Stats {
    total_challenges_created: number;
    total_challenges_solved: number;
    average_tries: number;
}

interface WordPaginationResponse {
    words: string[];
    total: number;
    page: number;
    page_size: number;
}

interface GameState {
    challenge: Challenge | null;
    stats: Stats | null;
    answerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    hint: string | null;
    words: string[];  // Add words to the state
    totalWords: number; // Track total words count
    currentPage: number; // Track current page
    pageSize: number; // Track page size
}

const initialState: GameState = {
    challenge: null,
    stats: null,
    answerStatus: 'idle',
    hint: null,
    words: [],  // Initialize words as an empty array
    totalWords: 0,  // Initialize total words count
    currentPage: 1,  // Start on page 1
    pageSize: 20,  // Default page size
};

// Async thunk to fetch words from the API
export const fetchWords = createAsyncThunk<WordPaginationResponse, { page: number, pageSize: number, filter: string | null }>(
    'game/fetchWords',
    async ({ page, pageSize, filter }) => {
        const response = await fetch(`${API_BASE}/words?page=${page}&page_size=${pageSize}&filter=${filter || ''}`);
        return response.json();
    }
);

// Async thunks to interact with the API
export const fetchChallenge = createAsyncThunk<Challenge, void>(
    'game/fetchChallenge',
    async () => {
        const response = await fetch(`${API_BASE}/challenge`, { method: 'POST' });
        return response.json();
    }
);

export const submitAnswer = createAsyncThunk<AnswerResponse, { id: string; answer: string }>(
    'game/submitAnswer',
    async ({ id, answer }) => {
        const response = await fetch(`${API_BASE}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, answer }),
        });
        return response.json();  // Ensure this matches AnswerResponse
    }
);

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallenge.fulfilled, (state, action) => {
                state.challenge = action.payload;
                state.hint = action.payload.hint;
            })
            .addCase(submitAnswer.fulfilled, (state, action) => {
                const { correct, hint } = action.payload;  // This is correctly typed as AnswerResponse
                if (correct) {
                    // Handle correct answer (update stats, etc.)
                } else {
                    state.hint = hint;  // Update the hint if the answer is incorrect
                }
            })
            // Handle the fetched words response
            .addCase(fetchWords.fulfilled, (state, action) => {
                const { words, total, page, page_size } = action.payload;
                state.words = words;
                state.totalWords = total;
                state.currentPage = page;
                state.pageSize = page_size;
            });
    },
});

export default gameSlice.reducer;
