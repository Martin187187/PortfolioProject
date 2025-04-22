// src/CoordinateApp.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinates, addCoordinate, Coordinate } from '../store/coordinatesSlice';
import { RootState, AppDispatch } from '../store';  // Import AppDispatch type

const CoordinateApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Type the dispatch function
    const { coordinates, status, error } = useSelector((state: RootState) => state.coordinates);

    const [newCoordinate, setNewCoordinate] = useState<Coordinate>({
        lat: 0,
        lng: 0,
        number: 0,
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCoordinates()); // Fetch coordinates when the component mounts
        }
    }, [dispatch, status]);

    const handleAddCoordinate = () => {
        dispatch(addCoordinate(newCoordinate)); // Dispatch addCoordinate thunk action
        setNewCoordinate({ lat: 0, lng: 0, number: 0 }); // Reset form after adding
    };

    return (
        <div>
            <h1>Coordinates App</h1>

            {/* Form to add new coordinate */}
            <div>
                <input
                    type="number"
                    value={newCoordinate.lat}
                    onChange={(e) => setNewCoordinate({ ...newCoordinate, lat: +e.target.value })}
                    placeholder="Latitude"
                />
                <input
                    type="number"
                    value={newCoordinate.lng}
                    onChange={(e) => setNewCoordinate({ ...newCoordinate, lng: +e.target.value })}
                    placeholder="Longitude"
                />
                <input
                    type="number"
                    value={newCoordinate.number}
                    onChange={(e) => setNewCoordinate({ ...newCoordinate, number: +e.target.value })}
                    placeholder="Point Number"
                />
                <button onClick={handleAddCoordinate}>Add Coordinate</button>
            </div>

            {/* List of coordinates */}
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            <h2>Stored Coordinates:</h2>
            <ul>
                {coordinates.map((coord, index) => (
                    <li key={index}>
                        Latitude: {coord.lat}, Longitude: {coord.lng}, Point Number: {coord.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoordinateApp;
