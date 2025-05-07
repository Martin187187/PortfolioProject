import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Paper, Box, CircularProgress, ThemeProvider, createTheme, Autocomplete } from '@mui/material';
import { AnswerResponse, fetchChallenge, submitAnswer, fetchWords } from '../store/gameSlice';
import { RootState, AppDispatch } from '../store';
import StatsCard from "./StatsCard";

// Create the custom theme with primary color set to #1c1c1c
const theme = createTheme({
    palette: {
        primary: {
            main: '#1c1c1c', // Set primary color to #1c1c1c
        },
        secondary: {
            main: '#f50057', // Example secondary color (adjust as needed)
        },
    },
});

const Game: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const challenge = useSelector((state: RootState) => state.game.challenge);
    const hint = useSelector((state: RootState) => state.game.hint);
    const stats = useSelector((state: RootState) => state.game.stats);
    const words = useSelector((state: RootState) => state.game.words); // Get filtered words from the state
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
    const [inputValue, setInputValue] = useState(''); // To control the input field for autocomplete
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if the dropdown is open
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Ref to store debounce timeout

    useEffect(() => {
        // Fetch a new challenge when the component mounts
        dispatch(fetchChallenge());
        // Fetch words when the component mounts
        dispatch(fetchWords({ page: 1, pageSize: 20, filter: '' }));
    }, [dispatch]);

    const handleAnswerSubmit = () => {
        if (challenge) {
            dispatch(submitAnswer({ id: challenge.id, answer }))
                .then((response) => {
                    const { correct, hint: responseHint } = response.payload as AnswerResponse;
                    if (correct) {
                        setAnsweredCorrectly(true);
                        setFeedback('Correct! Well done!');
                    } else {
                        setAnsweredCorrectly(false);
                        setFeedback(`Incorrect. Hint: ${responseHint}`);
                    }
                })
                .catch(() => {
                    setFeedback('An error occurred. Please try again.');
                });
            setAnswer('');
        }
    };

    const handlePlayAgain = () => {
        // Reset game state and fetch a new challenge
        setFeedback(null);
        setAnsweredCorrectly(null);
        setAnswer('');
        dispatch(fetchChallenge());
    };

    const handleInputChange = (event: any, newInputValue: string) => {
        setInputValue(newInputValue);

        // Clear the previous timeout if it exists
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout for debouncing
        debounceTimeout.current = setTimeout(() => {
            // Fetch filtered words after the delay
            dispatch(fetchWords({ page: 1, pageSize: 20, filter: newInputValue }));
        }, 500); // 500ms delay (adjust as needed)
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (isDropdownOpen) {
                // Prevent answer submission if the dropdown is open
                e.preventDefault();

                // Select the first suggestion when Enter is pressed
                if (words.length > 0) {
                    setAnswer(words[0]);
                }
            } else {
                // Submit the answer if the dropdown is not open
                handleAnswerSubmit();
            }
        }
    };

    return (
        <ThemeProvider theme={theme}> {/* Apply the custom theme */}
            <StatsCard/>
            <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Word Challenge
                </Typography>

                {challenge ? (
                    <Box>
                        <Typography variant="h6">Word 1: {challenge.word1}</Typography>
                        <Typography variant="h6">Word 2: {challenge.word2}</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            Hint: {hint}
                        </Typography>

                        {/* Autocomplete dropdown for word suggestions */}
                        <Autocomplete
                            freeSolo
                            options={words} // The filtered words list
                            inputValue={inputValue} // Controlled input
                            onInputChange={handleInputChange} // Update filtered words as the user types
                            onChange={(event, value) => setAnswer(value || '')} // Set answer when a word is selected
                            open={isDropdownOpen} // Control whether the dropdown is open
                            onOpen={() => setIsDropdownOpen(true)} // Set dropdown open state
                            onClose={() => setIsDropdownOpen(false)} // Set dropdown close state
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Your answer"
                                    variant="outlined"
                                    fullWidth
                                    onKeyDown={handleKeyDown} // Handle Enter key press
                                    sx={{ marginBottom: 2 }}
                                />
                            )}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAnswerSubmit}
                            sx={{ marginBottom: 2 }}
                        >
                            Submit Answer
                        </Button>

                        {feedback && (
                            <Typography variant="h6" color={answeredCorrectly === null ? 'textSecondary' : answeredCorrectly ? 'green' : 'red'} align="center" gutterBottom>
                                {feedback}
                            </Typography>
                        )}

                        {answeredCorrectly && (
                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handlePlayAgain}
                                    sx={{ marginTop: 2 }}
                                >
                                    Play Again
                                </Button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                )}
            </Paper>
        </ThemeProvider>
    );
};

export default Game;
