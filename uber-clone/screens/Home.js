import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import SuggestedPlaces from "../components/SuggestedPlaces";

const Home = () => {
    const dispatch = useDispatch();

    return (
        <View className="p-5">
            <Image source={{ uri: "https://links.papareact.com/gzs" }} className="w-20 h-20" resizeMode="contain" />
            <GooglePlacesAutocomplete
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                placeholder="Where From?"
                minLength={2}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    dispatch(
                        setOrigin({
                            location: details?.geometry.location,
                            description: data?.description,
                        })
                    );
                    dispatch(setDestination(null));
                }}
                fetchDetails={true}
                styles={{
                    container: {
                        flex: 0,
                        paddingBottom: 20,
                    },
                    textInput: {
                        fontSize: 18,
                    },
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: "en",
                    components: "country:pk",
                }}

                // !Suggested search
                // predefinedPlaces={[{ description: "Karachi, Pakistan", geometry: { location: { lat: 67.0011, lng: 24.8607 } } }]}
            />

            <NavOptions />
            <SuggestedPlaces />
        </View>
    );
};

export default Home;
