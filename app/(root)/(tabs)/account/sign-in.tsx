import React, { useEffect, useState, useRef } from "react";
import { FlatList, Keyboard, Text, View } from "react-native";
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/customButton";
import OAuth from "@/components/ui/OAuth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { Link, router } from "expo-router";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "@/slices/authSlice";
import { useLoginMutation } from "@/services/authApi";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  // RTK Query mutations
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  // ✅ Load stored user once
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      } catch (err) {
        console.error("❌ Failed to load stored user:", err);
      }
    };
    loadStoredUser();
  }, []);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSignInPress = async () => {
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      // ✅ Save tokens separately
      dispatch(
        setCredentials({
          token: res.token,
          refreshToken: res.refreshToken,
        })
      );

      // ✅ Save user separately
      dispatch(
        setCredentials({ token: res.token, refreshToken: res.refreshToken })
      );

      // ✅ Persist tokens & user
      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("refreshToken", res.refreshToken);

      router.replace("/(root)/(tabs)/account");
      console.log("✅ Login successful:");
    } catch (err: any) {
      if (err?.data) {
        console.error("❌ Login failed:", err.data);
      } else if (err?.error) {
        console.error("❌ Login failed:", err.error);
      } else {
        console.error("❌ Login failed:", err);
      }
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
          // ✅ Call your backend to exchange id_token for app credentials
          const res = await googleLoginApi(id_token).unwrap();

          // ✅ Save to Redux
          dispatch(
            setCredentials({ token: res.token, refreshToken: res.refreshToken })
          );
          dispatch(setUser(res.user));

          // ✅ Persist in SecureStore
          await SecureStore.setItemAsync("token", res.token);
          await SecureStore.setItemAsync("refreshToken", res.refreshToken);
          await SecureStore.setItemAsync("user", JSON.stringify(res.user));

          router.replace("/(root)/(tabs)/account");
          console.log("✅ Google login successful:", res.user);
        } catch (err: any) {
          console.error("❌ Google login failed:", err?.data || err?.message);
        }
      }
    };
    handleAuthResponse();
  }, [response]);

  const handelGoogleSignIn = () => {
    promptAsync({ useProxy: true });
  };

  // Fields
  const formFields = [
    <InputField
      key="email"
      ref={emailRef}
      label="Email"
      placeholder="Enter your email"
      keyboardType="email-address"
      autoCapitalize="none"
      value={form.email}
      onChangeText={(value) => updateForm("email", value)}
      returnKeyType="next"
      onSubmitEditing={() => passwordRef.current?.focus()}
    />,
    <InputField
      key="password"
      ref={passwordRef}
      label="Password"
      placeholder="Enter your password"
      secureTextEntry
      icon={EyeIcon}
      altIcon={EyeSlashIcon}
      value={form.password}
      onChangeText={(value) => updateForm("password", value)}
      returnKeyType="done"
      onSubmitEditing={() => {
        Keyboard.dismiss();
        onSignInPress();
      }}
    />,
    <CustomButton
      key="signinBtn"
      onPress={onSignInPress}
      Title={isLoggingIn ? "Signing In..." : "Sign In"}
      disabled={isLoggingIn}
      BgVariant={isLoggingIn ? "disabled" : "primary"}
      TextVatiant="font-PSBold text-white uppercase"
      ClassName="gap-2 py-3 mt-6"
      IconRight={!isLoggingIn ? ArrowRightIcon : null}
    />,
    <OAuth
      key="oauth"
      onPressGoogle={() => request && handelGoogleSignIn()}
      onPressApple={() => console.log("Apple sign in pressed")}
      onPressBiometric={() => console.log("Biometric sign in pressed")}
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
