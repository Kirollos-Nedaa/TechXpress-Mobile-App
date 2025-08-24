import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/customButton";
import OAuth from "@/components/ui/OAuth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import API, { saveToken } from "@/services/api";
import { Link, router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSignInPress = async () => {
    setLoading(true);
    try {
      const res = await API.post("accounts/login", {
        email: form.email,
        password: form.password,
      });

      await saveToken(res.data.token);
      await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
      await SecureStore.setItemAsync("user", JSON.stringify(res.data.user));
      router.replace("/(root)/(tabs)/account");

      console.log("✅ Login successful:", res.data.user);
    } catch (err: any) {
      console.error("❌ Login failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handelFrogotPassword = () => {
    console.log("Forgot Password Pressed");
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

  const handelGoogleSignIn = () => {
    promptAsync({ useProxy: true }); // 👈 Expo Go
  };

  const handelAppleSignIn = () => {
    console.log("Login with Apple Pressed");
  };

  const handelBiometricSignIn = () => {
    console.log("Login with Biometric Pressed");
  };

  // Items to render inside FlatList
  const formFields = [
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
      key="password"
      label="Password"
      placeholder="Enter your password"
      secureTextEntry
      autoComplete="password"
      icon={EyeIcon}
      altIcon={EyeSlashIcon}
      value={form.password}
      onChangeText={(value) => updateForm("password", value)}
      forgotPassword={{
        onPress: handelFrogotPassword,
      }}
    />,
    <CustomButton
      key="signinBtn"
      onPress={onSignInPress}
      Title={loading ? "Signing In..." : "Sign In"}
      disabled={loading}
      BgVariant={loading ? "disabled" : "primary"}
      TextVatiant="text-white uppercase"
      ClassName="gap-2 py-3 mt-6"
      IconRight={!loading ? ArrowRightIcon : null}
    />,
    <OAuth
      key="oauth"
      onPressGoogle={() => request && handelGoogleSignIn()}
      onPressApple={handelAppleSignIn}
      onPressBiometric={handelBiometricSignIn}
    />,
    <View key="signupLink" className="flex flex-row justify-center mt-3">
      <Text className="text-gray-500 dark:text-gray-400 font-PSRegular">
        Don&apos;t have an account?
      </Text>
      <Link
        href={"/(root)/(tabs)/account/sign-up"}
        className="text-secondary-500 font-PSBold ml-2"
      >
        Sign Up
      </Link>
    </View>,
  ];

  return (
    <FlatList
      className="flex-1 bg-white dark:bg-gray-900 px-6 py-12"
      data={formFields}
      renderItem={({ item }) => <View className="mb-2">{item}</View>}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <View className="items-center mb-12">
          <Text className="text-4xl font-PSBold text-gray-800 dark:text-gray-200 mt-12">
            Welcome Back
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SignIn;
