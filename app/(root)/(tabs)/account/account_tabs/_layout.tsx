import { Stack } from "expo-router";
import { ThemeContext } from "@/context/themeContext";
import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";

const Layout = () => {
  const { isDark } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#303639" : "#F2F4F5",
        },
        headerTitleStyle: {
          fontFamily: "PublicSans-SemiBold",
          color: isDark ? "#fff" : "#191C1F",
        },
        headerShadowVisible: false,
        headerTintColor: isDark ? "#fff" : "#191C1F",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeftIcon
              size={28}
              color={isDark ? "#fff" : "#191C1F"}
              weight="bold"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="theme" options={{ title: "Theme" }} />
    </Stack>
  );
};

export default Layout;
