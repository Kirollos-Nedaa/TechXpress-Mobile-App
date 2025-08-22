import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useState } from "react";

const InputField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  icon: Icon,
  altIcon: AltIcon,
  iconStyle,
  forgotPassword,
  ...props
}) => {
  const { isDark } = useContext(ThemeContext);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-xl font-PSReg text-gray-900 dark:text-gray-100 mb-2 ${labelStyle}`}
            >
              {label}
            </Text>
            {forgotPassword && (
              <TouchableOpacity onPress={forgotPassword.onPress}>
                <Text className="text-lg font-PSReg text-secondary-500 mb-2">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            className={`relative bg-white dark:bg-gray-800 ${containerStyle}`}
          >
            <TextInput
              className={`p-3 font-PSSemiB text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 focus:border-primary-500 rounded-sm ${Icon ? "pr-12" : ""} ${inputStyle}`}
              secureTextEntry={secureTextEntry ? hidePassword : false}
              {...props}
            />
            {Icon && !secureTextEntry && (
              <View className="absolute right-3 top-1/2 -translate-y-1/2">
                <Icon
                  color={isDark ? "#FFFFFF" : "#191C1F"}
                  className={iconStyle}
                />
              </View>
            )}

            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {hidePassword ? (
                  Icon ? (
                    <Icon color={isDark ? "#FFFFFF" : "#191C1F"} />
                  ) : null
                ) : AltIcon ? (
                  <AltIcon color={isDark ? "#FFFFFF" : "#191C1F"} />
                ) : null}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
