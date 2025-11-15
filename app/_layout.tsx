// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const u = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!u);
    };
    check();
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
        </>
      )}
    </Stack>
  );
}
