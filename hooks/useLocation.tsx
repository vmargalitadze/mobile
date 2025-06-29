import * as Location from 'expo-location';
import { useState } from "react";

export default function useLocation() {
    const [error, setError] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    const getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access location was denied");
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});

            if (coords) {
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);
            }

            let response = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });

            if (response && response.length > 0) {
                const location = response[0];
                const addressString = `${location.street || ''} ${location.city || ''} ${location.region || ''} ${location.country || ''}`.trim();
                setAddress(addressString);
            }

            console.log("user location", response);
        } catch (err) {
            setError("Error getting location");
            console.error("Location error:", err);
        }
    };

    return { 
        longitude, 
        latitude, 
        address,
        error, 
        getUserLocation 
    };
}

