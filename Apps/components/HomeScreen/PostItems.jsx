import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItems({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        margin: 2,
        padding: 5,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        minHeight: 150,
      }}
      onPress={() => navigation.push("Item-detail", { product: item })}
    >
      <Image
        source={{ uri: item?.image }}
        style={{
          height: 140,
          width: 170,
          borderRadius: 8,
        }}
      />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ fontWeight: "bold" }}>By {item.userName}</Text>
        <Text style={{ fontSize: 14, marginTop: 4 }} numberOfLines={4}>
          {item.desc}
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "black",
            }}
          >
            ${item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
