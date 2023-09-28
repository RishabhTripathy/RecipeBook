<TouchableOpacity />;
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native";
import { CachedImage } from "../helpers/images";

export default function Categories({
  activeCategory,
  handleCatagoryChange,
  categoryData,
}) {
  return (
    <View className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categoryData.map((e, idCategory) => {
          let isActive = e.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              onPress={() => handleCatagoryChange(e.strCategory)}
              className="flex items-center space-y-1"
              key={idCategory}
            >
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className={`rounded-full  p-2 ${activeButtonClass}`}
              >
                <CachedImage
                  uri={e.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </Animated.View>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-600">
                {e.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
