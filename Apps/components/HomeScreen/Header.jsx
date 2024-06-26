import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();

  return (
    <View>
      {/*user info section */}
      <View className="p-2 pt-[8%] flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-10 h-10"
        />
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user.fullName}</Text>
        </View>
      </View>
      {/*searchBar*/}
      <View className="p-2 flex-row items-center m-2 bg-blue-50 rounded-full  border-[1px] border-black ">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput placeholder="Search" className="ml-2 text-[18px]" />
      </View>
    </View>
  );
}
