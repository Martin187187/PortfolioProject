import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoordinate } from '../store/coordinatesSlice';
import { AppDispatch } from '../store';

const CurrentLocationApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [locationError, setLocationError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getLocationByIP = async () => {
        setLoading(true);
        setLocationError(null);

        try {
            // Access the API token from environment variables
            const apiToken = process.env.REACT_APP_IPINFO_TOKEN;

            if (!apiToken) {
                setLocationError('API token is missing');
                setLoading(false);
                return;
            }

            const response = await fetch(`https://ipinfo.io/json?token=${apiToken}`);
            const data = await response.json();

            // If the API returns coordinates
            const [lat, lng] = data.loc.split(',');

            // Dispatch the action with the location data
            dispatch(
                addCoordinate({
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                    number: Date.now(),
                })
            );
        } catch (error) {
            setLocationError('Error fetching location by IP');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocationByIP();
    }, [dispatch]);

    return null;
};

export default CurrentLocationApp;
