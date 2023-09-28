import { View, Text, Image } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      500
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      500
    );

    if (isFocused) {
      setTimeout(() => {
        navigation.navigate("Home");
      }, 2500);
    }
  }, [isFocused]);

  return (
    <View className="flex h-full w-full  justify-center items-center bg-amber-500">
      <StatusBar style="light" />
      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring1padding }}
        >
          <Image
            style={{ width: hp(20), height: hp(20) }}
            source={require("../../assets/images/nj.png")}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2  mt-4 justify-center">
        <Text
          style={{ fontSize: hp(4) }}
          className="text-2xl font-bold text-white"
        >
          Hey, Foodies
        </Text>
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-semibold text-lg  text-white"
        >
          Food is always right
        </Text>
        <View className="space-y-1 ">
          <Text className="text-center font-extralight ">
            App Me Aoge{" "}
            <Text className="text-white  font-semibold italic uppercase">
              Recipie Paoge
            </Text>
            ,
          </Text>
          <Text className="text-center font-extralight ">
            Recipie paoge{" "}
            <Text className="text-white font-semibold italic uppercase">
              Khana Banaoge
            </Text>
            ,
          </Text>
          <Text className="text-center font-extralight  ">
            {" "}
            Khana khaoge{" "}
            <Text className="text-white font-semibold italic uppercase">
              Tript hojaoge.....
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
