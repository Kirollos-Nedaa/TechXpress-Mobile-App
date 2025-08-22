import { useEffect, useState } from "react";
import { router, useSegments } from "expo-router";
import SplashScreen from "@/app/(root)/welcome";
import "../global.css";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    // Check if we're coming from another route (navigation)
    // If segments length > 0, it means we navigated from somewhere else
    if (segments.length > 0) {
      // Direct navigation from another page, skip splash
      setShowSplash(false);
      router.replace("/home");
      return;
    }

    // Fresh app load, show splash for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [segments]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return null;
}