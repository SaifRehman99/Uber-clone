import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <View>
            <TouchableOpacity
                className="absolute top-5 left-8 z-50 p-3 rounded-full shadow-lg bg-white"
                onPress={() => {
                    navigation.navigate("HomeScreen");
                    dispatch(setOrigin(null));
                    dispatch(setDestination(null));
                }}
            >
                <Icon name="menu" />
            </TouchableOpacity>
            <View className="h-1/2">
                <Map />
            </View>
            <View className="h-1/2">
                <Stack.Navigator>
                    <Stack.Screen name="NavigateCard" component={NavigateCard} options={{ headerShown: false }} />
                    <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} options={{ headerShown: false }} />
                </Stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;
