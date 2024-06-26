import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemList from "../Screens/ItemList";
import Home from "../Screens/Home";
import ItemsDetail from "../Screens/ItemsDetail";

const Stack = createStackNavigator();
export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Item-list"
        component={ItemList}
        //setting routes for category name
        options={({ route }) => ({
          title: route.params.Category,
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
        })}
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
