import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestitemList from "../components/HomeScreen/LatestItemList";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (params) {
      getItemListByCategory();
    }
  }, [params]);

  const getItemListByCategory = async () => {
    setLoading(true); // Set loading to true when fetching starts
    setItemList([]);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.Category)
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setItemList(items);
    setLoading(false); // Set loading to false when fetching completes
  };

  return (
    <ScrollView className="-mt-5">
      {loading ? ( // Render loading spinner if loading is true
        <ActivityIndicator size="extralarge" color="#0000ff" className="mt-5" />
      ) : itemList?.length > 0 ? (
        <LatestitemList latestItemList={itemList} heading={""} />
      ) : (
        <Text className="text-center text-gray-500 font-bold text-[20px] mt-20">
          No Post Found
        </Text>
      )}
    </ScrollView>
  );
}
