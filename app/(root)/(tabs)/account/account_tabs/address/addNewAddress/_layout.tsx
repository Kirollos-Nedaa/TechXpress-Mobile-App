import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="step-1">
      <Stack.Screen name="step-1" options={{ headerShown: false }} />
      <Stack.Screen name="step-2" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
