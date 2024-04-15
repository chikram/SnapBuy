import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import diary from "../../assets/images/diary.png";
import explore from "../../assets/images/explore.png";
import connection from "../../assets/images/connection.png";
import logout from "../../assets/images/logout.png";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();
  const menulist = [
    {
      id: 1,
      name: "My Product",
      icon: diary,
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: explore,
      path: "explore",
    },
    {
      id: 3,
      name: "TubeGurru",
      icon: connection,
      url: "",
    },
    {
      id: 4,
      name: "logout",
      icon: logout,
    },
  ];

  const onMenuPress = (item) => {
    if (item.name == "Logout") {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image source={{ uri: user?.imageUrl }} style={styles.img} />
        <Text style={styles.txt1}>{user?.fullName}</Text>
        <Text style={styles.txt2}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={menulist}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className="flex-1 p-3 border-[1px] items-center
             rounded-lg mx-2 mt-4
           border-blue-400 bg-blue-50"
          >
            {item.icon && (
              <Image source={item?.icon} className="h-[50px] w-[50px]" />
            )}
            <Text className="text-[12px] mt-2 text-blue-700 font-bold">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
  },
  main: {
    alignItems: "center",
    marginTop: 70,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  txt1: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 2,
  },
  txt2: {
    fontSize: 18,
    marginTop: 2,
    color: "gray",
  },
});
