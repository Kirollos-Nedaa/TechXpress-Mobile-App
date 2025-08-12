import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";

type ThemeMode = "auto" | "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "auto",
  setThemeMode: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme, systemColorScheme } =
    useNativeWindColorScheme();

  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (themeMode === "auto") {
      setColorScheme(systemColorScheme); // follow system
    } else {
      setColorScheme(themeMode); // force theme
    }
  }, [themeMode, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}