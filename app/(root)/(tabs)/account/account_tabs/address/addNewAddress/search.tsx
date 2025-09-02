import { ThemeContext } from "@/context/themeContext";
import { router } from "expo-router";
import { MagnifyingGlassIcon, XIcon } from "phosphor-react-native";
import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";

export default function SearchAddress() {
  const { isDark } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([
    "30 Al Basaa, Qasouret Ash Shawam, Rod El Farag, Qasouret Ash Shawam, Rod El Farag",
    "30 El-Basha, At Teraa Al Boulaqeyah, Shubra",
    "30 El-Basha Square, Al Manyal Al Gharbi, Old Cairo",
    "30 El-Basha Lane, Oula, Al Giza",
    "30 El-Basha Lane, Al Abageyah, El Khalifa",
  ]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Cancel Button */}
      <TouchableOpacity
        className="flex flex-row justify-end mt-2 mb-5 mx-5"
        onPress={handleCancel}
      >
        <Text className="text-xl font-PSMed text-gray-900 dark:text-white">
          Cancel
        </Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row flex-1 border border-gray-200 dark:border-gray-700 rounded-md items-center p-3 mb-5">
          <MagnifyingGlassIcon
            size={20}
            color={isDark ? "#475156" : "#C9CFD2"}
          />
          <TextInput
            placeholder="Search for an address"
            placeholderTextColor="#77878F"
            className="flex-1 font-PSReg text-gray-900 dark:text-white mx-2"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <XIcon size={20} color="#77878F" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity className="px-4">
              <Text
                numberOfLines={1}
                className="text-sm font-PSReg text-gray-900 dark:text-gray-100"
              >
                {item}
              </Text>
            </TouchableOpacity>

            {index < results.length - 1 && (
              <View className="flex flex-row items-center justify-center my-4 mx-3">
                <View className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-700" />
              </View>
            )}
          </>
        )}
        ListFooterComponent={
          <View className="flex flex-row justify-end items-center px-4 py-3">
            <Text className="text-lg font-PSMed text-gray-400">powered by</Text>
            <Image
              source={require("@/assets/images/google-logo-full.webp")}
              style={{ resizeMode: "contain" }}
              className="w-16 h-8 ml-1"
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
