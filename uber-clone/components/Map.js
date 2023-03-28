import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    const mapRef = useRef();

    useEffect(() => {
        if (!origin || !destination) return;
        console.log("call...");

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

    return (
        <MapView
            ref={(ref) => {
                mapRef.current = ref;
            }}
            className="flex-1"
            mapType="mutedStandard"
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
                    strokeWidth={3}
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
                />
            )}
        </MapView>
    );
};

export default Map;
