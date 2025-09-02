import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { BriefcaseIcon, HouseIcon } from "phosphor-react-native";

export default function Step2() {
  const { finalAddress } = useLocalSearchParams<{ finalAddress: string }>();
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");

  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    console.log("Saved address:", { finalAddress, label });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 p-4">
      <View className="flex-row justify-end px-3">
        <TouchableOpacity onPress={handleCancel}>
          <Text className="text-xl font-PSReg text-gray-900 dark:text-white">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-md font-bold uppercase text-gray-600 dark:text-gray-400 mb-4">
        Location Information
      </Text>

      {/* Picked Address */}
      <Text className="text-xl font-PSBold text-gray-900 dark:text-gray-50 mb-4">
        {finalAddress}
      </Text>

      {/* Additional */}
      <Text className="font-PSReg text-gray-300 dark:text-gray-600 mb-2">
        Additional Address Details
      </Text>
      <TextInput
        className="border-b border-gray-300 p-3 mb-4"
        placeholder="e.g. Floor 2, Apt 5"
      />

      {/* Address Label */}
      <Text className="mb-2 font-semibold">Address Label</Text>
      <View className="flex-row gap-2 mb-4">
        {["Home", "Work", "Other"].map((option) => {
          const isActive = label === option;
          const Icon =
            option === "Home"
              ? HouseIcon
              : option === "Work"
                ? BriefcaseIcon
                : null;

          return (
            <TouchableOpacity
              key={option}
              onPress={() => setLabel(option as any)}
              className={`px-3 py-1 rounded-full ${
                isActive ? "bg-primary-500" : "border border-gray-900"
              }`}
            >
              <View className="flex flex-row items-center justify-center gap-1">
                {Icon && (
                  <Icon size={18} color={isActive ? "#FFF" : "#191C1F"} />
                )}
                <Text
                  className={`font-bold ${
                    isActive ? "text-white" : "text-gray-900"
                  }`}
                >
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        className="bg-green-600 py-4 rounded-xl"
        onPress={handleSave}
      >
        <Text className="text-center text-gray-900 dark:text-white font-bold text-lg">
          SAVE ADDRESS
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
