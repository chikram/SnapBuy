import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

export default function AddPost() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View className="p-10">
      <Text className="font-bold text-[27px]">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">
        Create a New Post and Start
      </Text>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              numberOfLines={5}
              value={values?.desc}
              onChangeText={handleChange("desc")}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange("address")}
            />
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 p-4 rounded-full mt-7"
            >
              <Text className="text-white text-center text-[16px]">Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
    textAlignVertical: "top",
  },
});
