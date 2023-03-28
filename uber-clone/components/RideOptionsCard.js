import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravekTimeInformation } from "../slices/navSlice";

const data = [
    { id: 123, title: "UberX", multiplier: 1, image: "https://links.papareact.com/3pn" },
    { id: 45, title: "Uber XL", multiplier: 1.2, image: "https://links.papareact.com/5w8" },
    { id: 42, title: "Uber LUX", multiplier: 1.5, image: "https://links.papareact.com/7pf" },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);

    const travelTimeInformation = useSelector(selectTravekTimeInformation);

    return (
        <View className="flex-grow bg-white">
            <View>
                <Text className="text-center py-5 text-xl">Select a Ride - {travelTimeInformation?.distance.text}</Text>
            </View>

            <TouchableOpacity className="absolute top-5 left-5 rounded-full bg-slate-200" onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>

            <FlatList
                data={data}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className={`flex-row justify-between items-center px-10 ${selected?.id === item.id ? " bg-gray-200" : ""}`}
                        onPress={() => setSelected(item)}
                    >
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: item?.image }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    marginRight: 15,
                                    resizeMode: "contain",
                                }}
                            />
                            <View>
                                <Text className="font-bold text-xl">{item?.title}</Text>
                                <Text className="text-gray-400">{travelTimeInformation?.duration?.text}</Text>
                            </View>
                        </View>
                        <Text className="text-xl">
                            {new Intl.NumberFormat("en-pk", {
                                style: "currency",
                                currency: "PKR",
                            }).format(travelTimeInformation?.duration.value * item.multiplier)}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity disabled={!selected} className="bg-black py-3 m-2 rounded">
                    <Text className="text-center text-white text-xl">Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RideOptionsCard;
