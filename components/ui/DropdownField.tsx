import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useState, useRef, useEffect } from "react";
import { CaretDownIcon, CaretUpIcon } from "phosphor-react-native";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownField = ({
  label,
  labelStyle,
  containerStyle,
  inputStyle,
  data = [],
  selectedValue,
  onSelect,
  placeholder = "Select an option",
}) => {
  const { isDark } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  // Animate dropdown
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [visible]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {/* Label */}
          <Text
            className={`text-xl font-PSReg text-gray-800 dark:text-gray-100 mb-2 ${labelStyle}`}
          >
            {label}
          </Text>

          {/* Dropdown box */}
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            activeOpacity={0.8}
            className={`flex-row justify-between items-center 
                    bg-white dark:bg-gray-800 border 
                    border-gray-200 dark:border-gray-600 
            ${visible ? "rounded-t-sm rounded-b-none" : "rounded-sm"} p-3 py-2 ${containerStyle}`}
          >
            <Text
              className={`font-PSSemiB ${
                selectedValue
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-200 dark:text-gray-600"
              } ${inputStyle}`}
            >
              {selectedValue || placeholder}
            </Text>
            {visible ? (
              <CaretUpIcon size={20} color={isDark ? "#FFF" : "#191C1F"} />
            ) : (
              <CaretDownIcon size={20} color={isDark ? "#FFF" : "#191C1F"} />
            )}
          </TouchableOpacity>

          {/* Dropdown inline list */}
          {visible && (
            <View
              className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 
                        dark:border-gray-600 rounded-b-sm"
            >
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                      setVisible(false);
                    }}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Text className="font-PSSemiB text-gray-900 dark:text-gray-100">
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DropdownField;
