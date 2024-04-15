import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

export default function ItemsDetail({ navigation }) {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();
  useEffect(() => {
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);
  //for share button

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={24}
          color="white"
          style={{ marginRight: 15 }}
          onPress={() => sharePruct()}
        />
      ),
    });
  };

  const sharePruct = () => {
    const content = { message: product.title + "\n" + product.desc };
    Share.share(content).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendEmailMessage = () => {
    const subject = "Regarding " + product.title;
    const body =
      "Hi " + product.userName + "\n" + "I am intrested in buying this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };
  const deleteUserPost = () => {
    Alert.alert("Do you want to Delete?", "Are you want to Delete this Post", [
      {
        text: "Yes",
        onPress: () => deleteFromFireStore(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
    ]);
  };

  //to delete product
  const deleteFromFireStore = async () => {
    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product.title)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((res) => {
        nav.goBack();
      });
    });
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
      {user?.primaryEmailAddress.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={() => deleteUserPost()}
          className="z-40 rounded-full bg-red-500 p-4 m-2"
        >
          <Text className="text-center text-white ">Delete Post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="z-40 rounded-full bg-blue-500 p-4 m-2"
        >
          <Text className="text-center text-white ">Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
