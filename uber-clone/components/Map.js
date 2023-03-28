import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const mapRef = useRef();
    const dispatch = useDispatch();

    const [margin, setMargin] = useState(1);

    useEffect(() => {
        if (!origin || !destination) return;

        // zoom and fit to markers
        // not working
        // mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {edgePadding:{}, animated: true});

        mapRef.current.fitToCoordinates(
            [
                { latitude: origin?.location?.lat, longitude: origin?.location?.lng },
                { latitude: destination?.location?.lat, longitude: destination?.location?.lng },
            ],
            {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 10,
                    left: 50,
                },
                animated: true,
            }
        );
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            try {
                const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin?.description}&destinations=${destination?.description}&key=${GOOGLE_API_KEY}`;
                const res = await fetch(URL);
                const data = await res.json();

                dispatch(setTravelTimeInformation(data.rows[0]?.elements[0]));
            } catch (error) {
                alert(error.message || "Something went wrong...");
            }
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_API_KEY]);

    return (
        <MapView
            ref={(ref) => {
                mapRef.current = ref;
            }}
            className="flex-1"
            mapType="standard"
            userInterfaceStyle="dark"
            showsTraffic={true}
            showsIndoorLevelPicker={true}
            loadingEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onMapReady={() => {
                setMargin(0);
            }}
            initialRegion={{
                latitude: origin?.location?.lat,
                longitude: origin?.location?.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin?.description}
                    destination={destination?.description}
                    apikey={GOOGLE_API_KEY}
                    strokeColor="black"
                    strokeWidth={5}
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin?.location?.lat,
                        longitude: origin?.location?.lng,
                    }}
                    title="Origin"
                    description={origin?.description}
                    identifier="origin"
                    image={{ uri: "https://i.ibb.co/C9Y2QRh/destination-1.png" }}
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination?.location?.lat,
                        longitude: destination?.location?.lng,
                    }}
                    title="Destination"
                    description={destination?.description}
                    identifier="destination"
                    image={{ uri: "https://i.ibb.co/C9Y2QRh/destination-1.png" }}
                />
            )}
        </MapView>
    );
};

export default Map;
