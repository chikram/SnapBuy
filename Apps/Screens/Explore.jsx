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
    <>
      <Text className="text-[30px] font-bold m-5">Explore More</Text>
      <ScrollView className="-mt-5 px-3">
        <LatestitemList latestItemList={productList} className="-pt-5" />
      </ScrollView>
    </>
  );
}
