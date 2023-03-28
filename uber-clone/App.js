import "react-native-gesture-handler";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./screens/Home";
import AndroidSafeAreaView from "./utils/AndroidSafeAreaView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <SafeAreaView style={AndroidSafeAreaView.AndroidSafeArea}>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen
                                name="HomeScreen"
                                component={Home}
                                options={{ headerShown: false, gestureEnabled: true, gestureDirection: "horizontal" }}
                            />
                            <Stack.Screen
                                name="MapScreen"
                                component={MapScreen}
                                options={{ headerShown: false, gestureEnabled: true, gestureDirection: "horizontal" }}
                            />
                        </Stack.Navigator>
                    </SafeAreaView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({});
