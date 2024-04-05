import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import LatestitemList from "../components/HomeScreen/LatestItemList";

export default function Explore() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);
  //use to get all product
  const getAllProduct = async () => {
    setProductList([]);
    const q = query(collection(db, "UserPost"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestitemList latestItemList={productList} />
    </ScrollView>
  );
}
