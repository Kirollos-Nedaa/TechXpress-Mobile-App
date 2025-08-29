import { Tabs } from "expo-router";
import {
  HouseIcon,
  ShoppingCartSimpleIcon,
  UserIcon,
} from "phosphor-react-native";
import { View } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";
import { useGetProfileQuery } from "@/services/userApi";

const TabIcon = ({ Icon, color }) => (
  <View>
    <Icon size={24} color={color} />
  </View>
);

const Layout = () => {
  const { isDark } = useContext(ThemeContext);

  const { data: profile } = useGetProfileQuery(undefined, { skip: false });
  const cartCount = profile?.cartCount ?? 0;
  const cartBadge =
    cartCount === 0 ? undefined : cartCount > 9 ? "+9" : String(cartCount);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: "#FA8232",
        tabBarInactiveTintColor: isDark ? "#5F6C72" : "#ADB7BC",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "PublicSans-SemiBold",
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#191C1F" : "#FFFFFF",
          borderTopColor: isDark ? "#5F6C72" : "#ADB7BC",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIcon Icon={HouseIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabIcon Icon={ShoppingCartSimpleIcon} color={color} />
          ),
          tabBarBadge: cartBadge,
          tabBarBadgeStyle: {
            fontSize: 12,
            fontFamily: "PublicSans-SemiBold",
            backgroundColor: "#FA8232",
            color: "#FFFFFF",
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <TabIcon Icon={UserIcon} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
