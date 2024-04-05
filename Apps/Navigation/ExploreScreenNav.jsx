import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../Screens/Explore";
import ItemsDetail from "../Screens/ItemsDetail";

const Stack = createStackNavigator();
export default function ExploreScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Explore}
        options={{
          headerShown: false,
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
