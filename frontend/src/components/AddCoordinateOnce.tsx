// src/CurrentLocationApp.tsx
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { addCoordinate } from '../store/coordinatesSlice';
import { AppDispatch } from '../store';
import axios from 'axios';

const CurrentLocationApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [locationError, setLocationError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getApproximateLocation = async () => {
        setLoading(true);
        setLocationError(null);

        try {
            // Use ip-api to get approximate location based on IP address
            const response = await axios.get('http://ip-api.com/json');

            if (response.data.status === 'fail') {
                setLocationError('Unable to get location from IP address');
            } else {
                const { lat, lon } = response.data;

                // Dispatch the addCoordinate action with the approximate location
                dispatch(
                    addCoordinate({
                        lat,
                        lng: lon,
                        number: Date.now(), // You can use a timestamp or other unique number
                    })
                );

            }
        } catch (error) {
            setLocationError('Error fetching location');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getApproximateLocation();
    }, [dispatch]);

    return null;
};

export default CurrentLocationApp;
