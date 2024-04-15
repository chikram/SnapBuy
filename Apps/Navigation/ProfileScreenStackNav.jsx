import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile";
import MyProduct from "../Screens/MyProduct";
import ItemsDetail from "../Screens/ItemsDetail";

const Stack = createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-tab"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="my-product"
        component={MyProduct}
        options={{
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
          headerTitle: "My Product",
        }}
      />
      <Stack.Screen
        name="Item-detail"
        component={ItemsDetail}
        //setting routes for category name
        options={{
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
          headerTitle: "Details",
        }}
      />
    </Stack.Navigator>
  );
}
