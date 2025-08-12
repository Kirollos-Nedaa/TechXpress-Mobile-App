import { useColorScheme } from "react-native";

export default function useThemeMode() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return { colorScheme, isDark };
}
