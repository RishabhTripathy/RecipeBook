import {
  View,
  TextInput,
  ScrollView,
  StatusBar,
  Text,
  Image,
  Pressable,
} from "react-native";
import { FadeIn, FadeInDown, FadeInLeft, FadeOut } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";
import { CachedImage } from "../helpers/images";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  // Get Items

  const getMeal = async () => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);

        // console.log(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search.trim() !== "") {
      getMeal();
    } else {
      setMeals([]);
    }
  }, [search]);
  return (
    <View className=" flex-1 bg-white flex-col items-center  space-y-4">
      {/* SEARCHBAR  */}
      <Animated.View entering={FadeInDown.duration(700).delay(100).springify().mass(4).damping(50)}
        style={{ marginTop: hp(12) }}
        className="mx-4 flex  flex-row  items-center bg-black/5 rounded-full p-[6px]"
      >
        <TextInput
          placeholder="Search Any Recipe"
          placeholderTextColor={"gray"}
          style={{ fontSize: hp(1.8) }}
          value={search}
          onChangeText={(e) => setSearch(e)}
          className="flex-1 pl-4 mb-2 text-base h-full   tracking-wider"
        />
        <View className=" bg-white rounded-full p-3">
          <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={"gray"} />
        </View>
      </Animated.View>
      <ScrollView
        className="bg-white flex-1 w-full h-full px-4 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBar />

        {search && (
          <View className=" space-y-4 ">
            <Text
              style={{ fontSize: hp(3) }}
              className="text-neutral-600 underline  text-center mt-4"
            >
              Search Results{" "}
            </Text>
            {meals && meals.length > 0 ? (
              meals.map((e, i) => (
                <Pressable
                  
                  onPress={() =>
                    navigation.navigate("RecipieDetails", { ...e })
                  }
                  key={i}
                  className="flex flex-row items-center  space-x-4"
                >
                  <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="rounded-full"
                  >
                    <CachedImage
                      uri={e?.strMealThumb}
                      style={{ width: hp(6), height: hp(6) }}
                      className="rounded-full"
                    />
                  </Animated.View>
                  <View className="">
                    <Text
                      style={{ fontSize: hp(1.8) }}
                      className="text-neutral-600 font-semibold"
                    >
                      {e?.strMeal}
                    </Text>
                  </View>
                </Pressable>
              ))
            ) : (
              <Text>No Items Found</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
