import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItems({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-1 flex-row m-2 rounded-lg
       border-[1px] border-slate-200"
      onPress={() => navigation.push("Item-detail", { product: item })}
    >
      <Image
        source={{ uri: item?.image }}
        className="h-[140px] w-[180px] rounded-lg"
      />
      <View className="mx-4">
        <Text className="text-[17px] font-bold mt-1">{item.title}</Text>
        <Text className="text-[20px] font-bold text-blue-500">
          ${item.price}
        </Text>
        <Text
          className="bg-blue-300 text-blue-600 w-[70px] 
           p-[2px] px-2 rounded-full text-center text-[10px]"
        >
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
