import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Animated,
  Easing,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemeContext } from "@/context/themeContext";

const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Animation configs
const openAnim = (backdrop: Animated.Value, slide: Animated.Value) =>
  Animated.parallel([
    Animated.timing(backdrop, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(slide, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }),
  ]);

const closeAnim = (
  backdrop: Animated.Value,
  slide: Animated.Value,
  onDone: () => void
) =>
  Animated.parallel([
    Animated.timing(backdrop, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(slide, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }),
  ]).start(onDone);

const CalendarPicker = ({
  value,
  onChange,
  label = "Date of Birth",
  placeHolder,
  icon: Icon,
  iconStyle,
}) => {
  const { isDark } = useContext(ThemeContext);
  const [showCalendar, setShowPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  // Animation refs
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (showCalendar) {
      setIsVisible(true);
      openAnim(backdropOpacity, slideY).start();
    } else {
      closeAnim(backdropOpacity, slideY, () => setIsVisible(false));
    }
  }, [showCalendar]);

  const togglePicker = () => {
    setTempDate(value || new Date());
    setShowPicker(true);
  };

  const handleChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (selectedDate) onChange(selectedDate);
    } else {
      if (selectedDate) setTempDate(selectedDate);
    }
  };

  const handleDone = () => {
    onChange(tempDate);
    setShowPicker(false);
  };

  return (
    <View className="my-2 w-full">
      {label && (
        <Text className="mb-2 text-xl font-PSReg text-gray-900 dark:text-gray-100">
          {label}
        </Text>
      )}

      {/* Input Field */}
      <TouchableOpacity
        onPress={togglePicker}
        className={`relative rounded-sm border px-4 py-3 bg-white dark:bg-gray-800 ${
          showCalendar
            ? "border-primary-500"
            : "border-gray-200 dark:border-gray-600"
        }`}
      >
        <Text
          className={`font-PSSemiB ${
            value
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-600"
          }`}
        >
          {value ? formatDate(value) : placeHolder}
        </Text>

        {Icon && (
          <View className="absolute right-3 py-2">
            <Icon
              color={isDark ? "#E4E7E9" : "#191C1F"}
              className={iconStyle}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* iOS Modal */}
      {Platform.OS === "ios" && isVisible && (
        <Modal
          visible={isVisible}
          transparent
          animationType="none"
          onRequestClose={() => setShowPicker(false)}
        >
          {/* Backdrop */}
          <Animated.View
            className="flex-1 bg-black/50"
            style={{ opacity: backdropOpacity }}
          >
            <TouchableOpacity
              className="flex-1"
              onPress={() => setShowPicker(false)}
              activeOpacity={1}
            />
          </Animated.View>

          {/* Sliding Content */}
          <Animated.View
            className="absolute bottom-0 left-0 right-0"
            style={{ transform: [{ translateY: slideY }] }}
          >
            <View className="rounded-t-xl bg-white pb-8 dark:bg-gray-900">
              {/* Header */}
              <View className="flex-row items-center justify-between border-b border-b-gray-100 px-5 py-4 dark:border-b-gray-800">
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text className="text-lg font-PSReg text-primary-500">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text className="text-lg font-PSBold text-gray-900 dark:text-gray-100">
                  Select Date
                </Text>
                <TouchableOpacity onPress={handleDone}>
                  <Text className="text-lg font-PSBold text-primary-500">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>

              {/* iOS Date Picker */}
              <View className="items-center justify-center">
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date(1925, 0, 1)}
                  maximumDate={new Date()}
                  onChange={handleChange}
                  className="h-52 w-full"
                  themeVariant={isDark ? "dark" : "light"}
                />
              </View>
            </View>
          </Animated.View>
        </Modal>
      )}

      {/* Android Native Picker */}
      {Platform.OS === "android" && showCalendar && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          minimumDate={new Date(1925, 0, 1)}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default CalendarPicker;
