import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateOfBirthPickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
}

const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({
  value,
  onChange,
  label = "Date of Birth",
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker(!showPicker);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="my-2">
      {label && (
        <Text className="text-xl font-PSReg text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={togglePicker}
        className={`border rounded-sm px-4 py-3 bg-white dark:bg-gray-800 ${
          showPicker
            ? "border-[#FA8232]"
            : "border-gray-200 dark:border-gray-600"
        }`}
      >
        <Text
          className={`font-PSSemiB ${value ? "text-gray-900 dark:text-gray-100" : "text-gray-200 dark:text-gray-600"}`}
        >
          {value ? formatDate(value) : "Select your date of birth"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <View className="flex-1 justify-center items-center mt-4">
          <View className="bg-white dark:bg-gray-900 rounded-sm">
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              maximumDate={new Date()}
              onChange={handleChange}
              accentColor="#FA8232"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DateOfBirthPicker;
