import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="addNewAddress"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="editAddress"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
};

export default Layout;
