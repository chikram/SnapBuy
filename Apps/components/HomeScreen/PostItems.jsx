import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItems({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-1 m-2 rounded-lg
       border-[1px] border-slate-200"
      onPress={() => navigation.push("Item-detail", { product: item })}
    >
      <Image
        source={{ uri: item?.image }}
        className="h-[130px] w-full rounded-lg"
      />
      <View className="mx-4">
        <Text className="text-[20px] font-bold mt-1">{item.title}</Text>
        <Text className="text-[17px] font-bold text-red-500">
          ${item.price}
        </Text>
        <Text className="pb-3  text-gray-500">{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
}
