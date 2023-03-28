import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const data = [
    {
        id: 123,
        icon: "home",
        location: "Home",
        destination: "Portland Oregon, USA",
    },
    {
        id: 456,
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK",
    },
    {
        id: 1456,
        icon: "briefcase",
        location: "Work",
        destination: "Germany",
    },
];

const SuggestedPlaces = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item?.id}
            ItemSeparatorComponent={() => <View className="bg-gray-500" style={{ height: 0.5 }}></View>}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity className="flex-row items-center p-4">
                    <View className="mr-4 rounded-full bg-gray-300 p-4">
                        <Icon name={icon} type="ionicon" color={"white"} size={18} />
                    </View>

                    <View>
                        <Text className="font-bold text-lg">{location}</Text>
                        <Text className="text-gray-500">{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default SuggestedPlaces;
