import { View, Text, TouchableOpacity } from "react-native";
import { CaretRightIcon } from "phosphor-react-native";
import * as PhosphorIcons from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const ProfileSection = ({ title, tabs }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="mt-6">
      <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </Text>

      {/* Container */}
      <View className="bg-white dark:bg-gray-900 rounded-md">
        {tabs.map((tab, index) => {
          const isLast = index === tabs.length - 1;
          const IconComponent = PhosphorIcons[tab.iconName];

          return (
            <View key={index}>
              <TouchableOpacity
                key={index}
                onPress={tab.onPress}
                className="flex-row items-center justify-between py-4 px-4"
              >
                {/* Left side: icon + label */}
                <View className="flex-row items-center gap-5">
                  {IconComponent && (
                    <IconComponent
                      size={24}
                      color={isDark ? "#E4E7E9" : "#191C1F"}
                    />
                  )}
                  <Text className="text-lg text-gray-900 dark:text-gray-100">
                    {tab.label}
                  </Text>
                </View>

                {/* Right arrow */}
                <CaretRightIcon
                  size={20}
                  color={isDark ? "#E4E7E9" : "#191C1F"}
                />
              </TouchableOpacity>
              {!isLast && (
                <View className="h-[1px] bg-gray-100 dark:bg-gray-800 mx-4" />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileSection;
