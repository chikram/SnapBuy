import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Slider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../components/HomeScreen/Categories";
import LatestitemList from "../components/HomeScreen/LatestItemList";

export default function Home() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getSlider();
    getCategoryList();
    getLatestItemList();
  }, []);
  //use to get silder data
  const getSlider = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  //use to get category from firebase
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  //use to get created post from firebase
  const getLatestItemList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };
  return (
    <ScrollView className="py-8 px-2  bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestitemList latestItemList={latestItemList} />
    </ScrollView>
  );
}
