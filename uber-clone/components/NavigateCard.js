import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";

const NavigateCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <View>
            <Text className="text-center py-5 text-xl font-semibold">Good Morning, Saif</Text>

            <View>
                <View>
                    <GooglePlacesAutocomplete
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={800}
                        placeholder="Where to?"
                        minLength={2}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details?.geometry.location,
                                    description: data?.description,
                                })
                            );

                            navigation.navigate("RideOptionsCard");
                        }}
                        fetchDetails={true}
                        styles={{
                            container: {
                                flex: 0,
                                paddingTop: 20,
                                paddingBottom: 20,
                                backgroundColor: "white",
                            },
                            textInput: {
                                borderRadius: 0,
                                fontSize: 18,
                                backgroundColor: "#DDDDDf",
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                paddingBottom: 0,
                            },
                        }}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: "en",
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default NavigateCard;
