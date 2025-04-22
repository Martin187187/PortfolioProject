import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import L, { Icon, LatLngExpression, LatLngBounds } from 'leaflet';

// Important: Import Leaflet CSS!
import 'leaflet/dist/leaflet.css';
import { fetchCoordinates } from '../store/coordinatesSlice';

// Create a custom Needle Icon
const needleIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
});

interface FitBoundsProps {
    bounds: LatLngBounds | null;
    minZoom: number;
}

const FitBounds: React.FC<FitBoundsProps> = ({ bounds, minZoom }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 }); // Optionally set a maxZoom as well
            if (map.getZoom() < minZoom) {
                map.setZoom(minZoom);
            }
        } else {
            map.setZoom(minZoom); // Set initial zoom if no coordinates
            map.setView([20.5937, 78.9629]); // Set an initial center
        }
    }, [bounds, map, minZoom]);

    return null;
};

const WorldMap: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const coordinates = useSelector((state: RootState) => state.coordinates.coordinates);

    useEffect(() => {
        dispatch(fetchCoordinates());
    }, [dispatch]);

    // Calculate the bounds based on the coordinates
    const bounds: LatLngBounds | null = coordinates.length > 0
        ? coordinates.reduce((acc, coord) => {
            acc.extend([coord.lat, coord.lng]);
            return acc;
        }, L.latLngBounds([] as LatLngExpression[]))
        : null;

    // Define your desired minimum zoom level
    const minZoomLevel = 3; // Adjust this value to see the desired number of countries

    return (
        <div className="world-card">
            <h2>Visitors Around the World</h2>
            <MapContainer
                style={{ height: '400px', width: '100%' }}
                // We no longer need center and zoom here as FitBounds will handle it dynamically
                zoomSnap={0.5} // Optional: Adjust zoom increments
                zoomDelta={0.5} // Optional: Adjust zoom speed
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {coordinates.map((coord, index) => (
                    <Marker
                        key={index}
                        position={[coord.lat, coord.lng]}
                        icon={needleIcon}
                    >
                        <Popup>{`Point: ${coord.number}`}</Popup>
                    </Marker>
                ))}
                {/* Component to handle fitting the bounds with a minimum zoom */}
                <FitBounds bounds={bounds} minZoom={minZoomLevel} />
            </MapContainer>
        </div>
    );
};

export default WorldMap;