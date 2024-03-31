import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function PostItems({ item }) {
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200">
      <Image
        source={{ uri: item?.image }}
        className="h-[140px] w-full rounded-lg"
      />
      <View>
        <Text className="text-[17px] font-bold mt-1">{item.title}</Text>
        <Text className="text-[20px] font-bold text-blue-500">
          ${item.price}
        </Text>
        <Text className="bg-blue-300 text-blue-600 w-[70px] p-[2px] px-2 rounded-full text-center text-[10px]">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
