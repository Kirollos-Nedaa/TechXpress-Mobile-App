import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductDetails from '../screens/ProductDetails';
import BottomTabs from '../components/BottomTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Splash first */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      
    {/* Then main app with bottom navigation */}
      <Stack.Screen name="MainApp" component={BottomTabs} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
