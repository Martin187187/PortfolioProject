// src/store/coordinatesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || "/api";
// Define the Coordinate type
export interface Coordinate {
    lat: number;
    lng: number;
    number: number;
}

// Thunk to fetch coordinates from the backend
export const fetchCoordinates = createAsyncThunk<Coordinate[]>(
    'coordinates/fetchCoordinates',
    async () => {
        const response = await axios.get(`${API_BASE}/coordinates`);
        return response.data;
    }
);

// Thunk to add a new coordinate
const CACHE_KEY = 'approximate-location';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const addCoordinate = createAsyncThunk<Coordinate, Coordinate>(
    'coordinates/addCoordinate',
    async (coordinate, { rejectWithValue }) => {
        try {
            const cachedLocationRaw = localStorage.getItem(CACHE_KEY);

            if (cachedLocationRaw) {
                const cachedLocation = JSON.parse(cachedLocationRaw);

                const cacheTimestamp = new Date(cachedLocation.timestamp).getTime();
                const now = Date.now();

                if (now - cacheTimestamp < CACHE_DURATION_MS) {
                    console.log('Using cached coordinate:', cachedLocation);
                    // Cache still valid, return cached coordinate instead of posting again
                    return {
                        lat: cachedLocation.lat,
                        lng: cachedLocation.lng,
                        number: Date.now(), // New number (timestamp) to keep it unique
                    };
                }
            }

            console.log('Posting new coordinate:', coordinate);
            // No valid cache found, post to server
            await axios.post(`${API_BASE}/coordinates`, coordinate);

            // Save the posted coordinate to cache
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    lat: coordinate.lat,
                    lng: coordinate.lng,
                    timestamp: new Date().toISOString(),
                })
            );

            return coordinate;
        } catch (error) {
            console.error('Error in addCoordinate:', error);
            return rejectWithValue('Failed to add coordinate');
        }
    }
);
// Create the slice for coordinates
const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState: {
        coordinates: [] as Coordinate[],
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoordinates.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoordinates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coordinates = action.payload;
            })
            .addCase(fetchCoordinates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(addCoordinate.fulfilled, (state, action) => {
                state.coordinates.push(action.payload);
            });
    },
});

export default coordinatesSlice.reducer;
