import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipieDetails from "../screens/RecipieDetail";
import Search from "../screens/Search";
export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen
          name="RecipieDetails"
          component={RecipieDetails}
        ></Stack.Screen>
        <Stack.Screen name="Search" component={Search}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
