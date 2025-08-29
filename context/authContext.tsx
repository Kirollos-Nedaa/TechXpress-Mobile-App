import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "@/services/api"; // your axios instance

type Profile = {
  id: string;
  name: string;
  email: string;
  wishlist?: any[];
  cart?: any[];
};

type AuthContextType = {
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        setProfile(null);
        return;
      }
      const { data } = await api.get("/account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
    } catch (err) {
      console.error("❌ Failed to load profile:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
