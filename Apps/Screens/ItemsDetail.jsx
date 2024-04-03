import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function ItemsDetail() {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    params && setProduct(params.product);
  }, [params]);

  const sendEmailMessage = () => {
    const subject = "Regarding " + product.title;
    const body =
      "Hi " + product.userName + "\n" + "I am intrested in buying this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };
  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: product.image }} className="h-[350px] w-full" />
      <View className="p-3">
        <Text className="font-bold text-[24px]">{product?.title}</Text>
        <View className="items-baseline">
          <Text
            className="font-bold text-[16px]
           bg-blue-200 p-1 px-2 mt-2 rounded-full"
          >
            {product?.category}
          </Text>
        </View>

        <Text className="mt-3 text-[20px] font-bold">Description</Text>
        <Text className="text-[16px] text-gray-600">{product?.desc}</Text>
      </View>
      {/* user info */}
      <View className="p-3 flex-row items-center gap-3 bg-blue-100">
        <Image
          source={{ uri: product.userImage }}
          className="h-12 w-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text>{product.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => sendEmailMessage()}
        className="z-40 rounded-full bg-blue-500 p-4 m-2"
      >
        <Text className="text-center text-white ">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
