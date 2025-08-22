import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/customButton";
import OAuth from "@/components/ui/OAuth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import API, { saveToken } from "@/services/api";
import { Link } from "expo-router";
import DropdownField from "@/components/ui/DropdownField";
import DateOfBirthPicker from "@/components/ui/CalendarInputField";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const onSignUpPress = async () => {
    setLoading(true);
    try {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }
      console.log("Sign Up Data:", form);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        try {
          const res = await API.post("accounts/google-login", {
            idToken: id_token,
          });

          await saveToken(res.data.token);
          await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);

          console.log("✅ Google login successful:", res.data.user);
        } catch (err: any) {
          console.error(
            "❌ Google login failed:",
            err.response?.data || err.message
          );
        }
      }
    };

    handleAuthResponse();
  }, [response]);

  const handelGoogleSignUp = () => {
    promptAsync({ useProxy: true }); // 👈 Expo Go
  };

  const handelAppleSignUp = () => {
    console.log("Login with Apple Pressed");
  };

  const handelBiometricSignUp = () => {
    console.log("Login with Biometric Pressed");
  };

  // Form items to render inside FlatList
  const formFields = [
    <InputField
      key="fullName"
      label="Full Name"
      placeholder="Enter your full name"
      keyboardType="default"
      autoCapitalize="none"
      autoComplete="name"
      value={form.fullName}
      onChangeText={(value) => updateForm("fullName", value)}
    />,
    <InputField
      key="email"
      label="Email"
      placeholder="Enter your email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      value={form.email}
      onChangeText={(value) => updateForm("email", value)}
    />,
    <InputField
      key="phone"
      label="Phone Number"
      placeholder="Enter your phone number"
      keyboardType="phone-pad"
      autoComplete="tel"
      value={form.phoneNumber}
      onChangeText={(value) => updateForm("phoneNumber", value)}
    />,
    <DropdownField
      key="gender"
      label="Gender"
      data={["Male", "Female"]}
      selectedValue={form.gender}
      onSelect={(value) => updateForm("gender", value)}
      placeholder="Choose gender"
    />,
    <DateOfBirthPicker
      key="dob"
      value={dob}
      onChange={(date) => {
        setDob(date);
        updateForm("dob", date ? formatDate(date) : "");
      }}
      label="Date of Birth"
    />,
    <InputField
      key="password"
      label="Password"
      placeholder="Enter your password"
      secureTextEntry
      autoComplete="password"
      icon={EyeIcon}
      altIcon={EyeSlashIcon}
      value={form.password}
      onChangeText={(value) => updateForm("password", value)}
    />,
    <InputField
      key="confirmPassword"
      label="Confirm Password"
      placeholder="Confirm your password"
      secureTextEntry
      autoComplete="password"
      icon={EyeIcon}
      altIcon={EyeSlashIcon}
      value={form.confirmPassword}
      onChangeText={(value) => updateForm("confirmPassword", value)}
    />,
    <CustomButton
      key="signupBtn"
      onPress={onSignUpPress}
      Title={loading ? "Signing Up..." : "Sign Up"}
      disabled={loading}
      BgVariant={loading ? "disabled" : "primary"}
      TextVatiant="text-white uppercase"
      ClassName="gap-2 py-3 mt-6"
      IconRight={!loading ? ArrowRightIcon : null}
    />,
    <OAuth
      key="oauth"
      onPressGoogle={() => request && handelGoogleSignUp()}
      onPressApple={handelAppleSignUp}
      onPressBiometric={handelBiometricSignUp}
    />,
    <View key="signinLink" className="flex flex-row justify-center mt-3">
      <Text className="text-gray-500 dark:text-gray-400 font-PSRegular">
        Already have an account?
      </Text>
      <Link
        href={"/(auth)/sign-in"}
        className="text-secondary-500 font-PSBold ml-2"
      >
        Sign In
      </Link>
    </View>,
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}
        data={formFields}
        renderItem={({ item }) => <View className="mb-1">{item}</View>}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View className="items-center mb-12">
            <Text className="text-4xl font-PSBold text-gray-800 dark:text-gray-200 mt-6">
              Create Account
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SignUp;
