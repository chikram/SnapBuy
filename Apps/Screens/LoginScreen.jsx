import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <Image
        source={require("./../../assets/images/1.png")}
        className="w-full h-[500px] object-cover"
      />
      <View className="p-5 bg-white mt-[-20] rounded-t-3xl">
        <Text className="text-[40px] font-bold">SnapBuy</Text>
        <Text className="text-[18px] text-slate-400 mt-3">
          Buy Sell Marketplace where You can Sell Old Items
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="bg-blue-500 rounded-full p-4 mt-20"
        >
          <Text className="text-center text-[18px] text-white">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
