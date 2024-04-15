import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();

  return (
    <View className="mt-2">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            //passing category name
            onPress={() =>
              navigation.navigate("Item-list", {
                Category: item.name,
              })
            }
            className="flex-1 items-center 
          justify-center p-2 border-[1px]
          bg-blue-50  m-1 h-[80px] rounded-lg"
          >
            <Image source={{ uri: item?.icon }} className="h-[40px] w-[40px]" />
            <Text className="text-[12px] font-bold mt-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
