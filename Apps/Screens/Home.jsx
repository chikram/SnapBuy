import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Slider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../components/HomeScreen/Categories";

export default function Home() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getSlider();
    getCategoryList();
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

  return (
    <View className="py-8 px-2 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
    </View>
  );
}
