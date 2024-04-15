import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestitemList from "../components/HomeScreen/LatestItemList";
import { useNavigation } from "@react-navigation/native";

export default function MyProduct() {
  const { user } = useUser();
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener("focus", (e) => {});
  }, [navigation]);
  const getUserPost = async () => {
    setProductList([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <View>
      <LatestitemList latestItemList={productList} />
    </View>
  );
}
