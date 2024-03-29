import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function AddPost() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    getCategoryList();
  }, []);

  //use to get category from firebase
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  //use to pic image from Gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = (value) => {
    value.image = image;
    console.log(value);
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
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            ToastAndroid.show("Title must be there", ToastAndroid.SHORT);
            errors.name = "Title Must be there";
          }
          return errors;
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              ) : (
                <Image
                  source={require("./../../assets/images/placeholder.png")}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              )}
            </TouchableOpacity>
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
