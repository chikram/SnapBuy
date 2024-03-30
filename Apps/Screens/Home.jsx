import { View, Text } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";

export default function Home() {
  return (
    <View className="py-8 px-2 bg-white flex-1">
      <Header />
    </View>
  );
}
