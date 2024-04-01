import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItems from "./PostItems";

export default function LatestitemList({ latestItemList, heading }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItems item={item} />}
      />
    </View>
  );
}
