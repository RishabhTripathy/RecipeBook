import { View, Text, TextInput, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categoryData, setCategoryData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  // CATAGORY GET

  const getCatagories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategoryData(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Recipes GET

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setRecipeData(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCatagories();
    getRecipes();
  }, []);

  const handleCatagoryChange = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipeData([]);
  };

  return (
    <View className="flex-1 items-center justify-center h-full w-full">
      <StatusBar style="dark" />
      <ScrollView
        scrollVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 w-full h-full pt-14"
      >
        {/* LOGO AND NOTIFICATION BAR  */}
        <View className="flex flex-row mx-4 justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/nj.png")}
            style={{ height: hp(5), width: hp(5) }}
          />

          <BellIcon size={hp(4)} color="gray" />
        </View>
        {/* GREETINGS  */}
        <View className="mx-4 mb-2 space-y-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Aur,Bhukkad ! Kya Haal Hain? Bhook Lagi?
          </Text>

          <Text
            style={{ fontSize: hp(3) }}
            className="text-neutral-600 font-semibold"
          >
            Make your own <Text className="text-amber-400">Food</Text>.
          </Text>

          <Text
            style={{ fontSize: hp(3) }}
            className="text-neutral-600 font-semibold"
          >
            Stay At <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* SEARCHBAR  */}
        <Pressable
          onPress={() => navigation.navigate("Search")}
          className="mx-4 flex  flex-row items-center bg-black/5 rounded-full p-[6px]"
        >
          <TextInput
            placeholder="Search Any Recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            onPressIn={() => navigation.navigate("Search")}
            editable={false}
            className="flex-1 pl-4 mb-2  text-base h-full  tracking-wider"
          />
          <View className=" bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </Pressable>

        {/* CATEGORIES  */}
        <View className=" ">
          {categoryData.length > 0 ? (
            <Categories
              categoryData={categoryData}
              activeCategory={activeCategory}
              handleCatagoryChange={handleCatagoryChange}
            />
          ) : (
            <Loading size="large" className="mt-28" />
          )}
        </View>
        {/* RECIPES  */}
        <View>
          {recipeData && recipeData.length > 0 ? (
            <Recipes categoryData={categoryData} recipeData={recipeData} />
          ) : (
            <Loading size="large" className="mt-28" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
