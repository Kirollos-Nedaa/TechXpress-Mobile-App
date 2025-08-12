import { Link } from "expo-router";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import useThemeMode from "../hooks/useThemeMode";
import { HouseIcon, ArrowLeftIcon } from "phosphor-react-native";

export default function NotFoundScreen() {
  const { isDark } = useThemeMode();
  const { width } = useWindowDimensions();
  const imageSize = width * 0.7;

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white dark:bg-gray-900">
      <Image
        source={
          isDark
            ? require("../assets/images/404-dark.png")
            : require("../assets/images/404.png")
        }
        style={{ width: imageSize, height: imageSize }}
        className="mb-6"
        resizeMode="contain"
      />

      <Text className="text-3xl font-PSSemiB text-gray-900 dark:text-white mb-6 text-center">
        404, Page not found
      </Text>

      <Text
        className="text-base font-PSReg text-gray-700 dark:text-gray-400 mb-6 text-center"
        style={{ maxWidth: width > 520 ? 520 : width * 0.9 }}
      >
        Something went wrong. It’s look that your requested could not be found.
        It’s look like the link is broken or the page is removed.
      </Text>

      <View className="flex-row flex-wrap items-center justify-center gap-4">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center px-6 py-2 bg-primary-500 rounded-sm">
            <ArrowLeftIcon size={20} color="white" />
            <Text className="text-sm font-PSBold uppercase text-white ml-2">
              Go Back
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center px-6 py-2 border-2 border-primary-100 dark:border-primary-800 rounded-sm">
            <HouseIcon size={20} color="#FA8232" />
            <Text className="text-sm font-PSBold uppercase text-primary-500 ml-2">
              Go Home
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
