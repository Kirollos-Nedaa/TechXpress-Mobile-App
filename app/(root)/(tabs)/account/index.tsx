import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { ThemeContext } from "@react-navigation/native";
import UserProfileCards from "@/components/UserProfileCards";
import CustomButton from "@/components/ui/customButton";
import CustomProfileSection from "@/components/ui/CustomProfileSection";
import { PowerIcon } from "phosphor-react-native";
import { useGetProfileQuery, userApi } from "@/services/userApi";
import Constants from "expo-constants";

const AccountIndex = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isDark = useContext(ThemeContext);
  const version = Constants.expoConfig?.version;

  // ✅ RTK Query: fetch profile
  const {
    data: fullProfile,
    refetch,
    isLoading: profileLoading,
  } = useGetProfileQuery();

  // Check if token exists, otherwise redirect
  const checkToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (!storedToken) {
        router.replace("/(root)/(tabs)/account/sign-in");
        return;
      }
    } catch (error) {
      console.error("❌ Error checking token:", error);
      router.replace("/(root)/(tabs)/account/sign-in");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(userApi.util.resetApiState());
    router.replace("/(root)/(tabs)/account/sign-in");
  };

  const handleEditProfile = () => console.log("Edit Profile Pressed");
  const handleOrdersPress = () => console.log("Orders Pressed");
  const handleReturnsPress = () => console.log("Returns Pressed");
  const handleCreditsPress = () => console.log("Credits Pressed");
  const handleWishlistPress = () => console.log("Wishlist Pressed");
  const handleAddress = () =>
    router.push("/(root)/(tabs)/account/account_tabs/address");
  const handleTheme = () =>
    router.push("/(root)/(tabs)/account/account_tabs/theme");

  if (loading || profileLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#FA8232" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-gray-800"
      edges={["top"]}
    >
      <ScrollView
        className="flex-1 px-6 pt-2"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? "#E4E7E9" : "#000000"}
          />
        }
      >
        {fullProfile && (
          <UserProfileCards
            name={fullProfile?.name || "user.name"}
            email={fullProfile?.email || "user.email"}
            profilePicture={
              "https://avatars.githubusercontent.com/u/181299013?v=4"
            }
            editPress={handleEditProfile}
            ordersPress={handleOrdersPress}
            returnsPress={handleReturnsPress}
            returnsCount={1}
            creditsPress={handleCreditsPress}
            credits={0}
            wishlistPress={handleWishlistPress}
            wishlistCount={fullProfile?.wishlistCount ?? 0}
          />
        )}

        <CustomProfileSection
          title={"My account"}
          tabs={[
            {
              label: "Addresses",
              iconName: "MapTrifold",
              onPress: handleAddress,
            },
            {
              label: "Payment",
              iconName: "CreditCard",
              onPress: handleReturnsPress,
            },
            {
              label: "Warranty Claims",
              iconName: "Certificate",
              onPress: handleCreditsPress,
            },
            {
              label: "Placeholder",
              iconName: "Placeholder",
              onPress: handleWishlistPress,
            },
          ]}
        />

        <CustomProfileSection
          title={"Settings"}
          tabs={[
            { label: "Theme", iconName: "Palette", onPress: handleTheme },
            {
              label: "Notifications",
              iconName: "Bell",
              onPress: handleReturnsPress,
            },
          ]}
        />

        <View className="flex flex-row items-center justify-center mt-6 mx-[40%]">
          <View className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700" />
        </View>

        <CustomButton
          onPress={handleLogout}
          Title="Sign Out"
          BgVariant="default"
          TextVatiant="text-gray-900 dark:text-white"
          ClassName="gap-2 py-4 my-6"
          IconName="Power"
          IconDarkMode={true}
          IconSize={20}
          IconWeight="bold"
          IconLeft={PowerIcon}
        />

        <View className="flex flex-col items-center">
          <Text className="text-center text-sm text-gray-200 dark:text-gray-600 mt-4 mb-2">
            App Version {version}
          </Text>
          <Text className="text-center text-sm text-gray-300 dark:text-gray-500 mb-6">
            © 2025 TechXpress. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountIndex;
