import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {fetchStats} from "../store/gameSlice";

const StatItem = ({
                      title,
                      value,
                      icon,
                  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}) => (
    <Card
        sx={{
            borderRadius: 3,
            boxShadow: 3,
            p: 2,
            minWidth: 200,
            flex: 1,
            backgroundColor: '#f9f9f9',
        }}
    >
        <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
                <Box
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" fontWeight={500}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const StatsCard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stats = useSelector((state: RootState) => state.game.stats);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    if (!stats) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={3}
                flexWrap="wrap"
                alignItems="stretch"
            >
                <StatItem
                    title="Challenges Created"
                    value={stats.total_challenges_created}
                    icon={<BarChartIcon />}
                />
                <StatItem
                    title="Challenges Solved"
                    value={stats.total_challenges_solved}
                    icon={<EmojiEventsIcon />}
                />
                <StatItem
                    title="Average Tries"
                    value={stats.average_tries}
                    icon={<ShowChartIcon />}
                />
            </Box>
        </Box>
    );
};

export default StatsCard;
