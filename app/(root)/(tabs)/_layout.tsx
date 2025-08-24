import { Tabs } from "expo-router";
import {
  HouseIcon,
  ShoppingCartSimpleIcon,
  UserIcon,
} from "phosphor-react-native";
import { View } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

const TabIcon = ({ Icon, color }) => (
  <View>
    <Icon size={24} color={color} />
  </View>
);

const Layout = () => {
  const { isDark } = useContext(ThemeContext);

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
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "spring",
            config: {
              duration: 200,
            },
          },
          hide: {
            animation: "timing",
            config: {
              duration: 200,
            },
          },
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
          tabBarBadge: "+9",
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
