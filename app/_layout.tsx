import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  Appearance,
  useColorScheme,
  Pressable,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Sun, Moon } from "lucide-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type ThemeMode = "light" | "dark";

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(
    (systemScheme as ThemeMode) || "light"
  );

  // Load preferensi user dari AsyncStorage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("user-theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
    })();
  }, []);

  // Warna global berdasarkan mode
  const backgroundColor = theme === "dark" ? "#0b0f19" : "#ffffff";
  const tint = theme === "dark" ? "#f3f4f6" : "#111827";

  // Toggle manual dark/light mode
  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("user-theme", newTheme);
    Appearance.setColorScheme(newTheme);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor },
          headerTintColor: tint,
          contentStyle: { backgroundColor },
          headerRight: () => (
            <View style={{ marginRight: 12 }}>
              <Pressable
                onPress={toggleTheme}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  backgroundColor:
                    theme === "dark" ? "rgba(255,255,255,0.1)" : "#e5e7eb",
                }}
              >
                <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
                  {theme === "dark" ? (
                    <Sun size={20} color="#facc15" />
                  ) : (
                    <Moon size={20} color="#111827" />
                  )}
                </Animated.View>
              </Pressable>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Book My Seat" }} />
        <Stack.Screen name="booking/new" options={{ title: "New Booking" }} />
        <Stack.Screen
          name="booking/[id]"
          options={{ title: "Booking Detail" }}
        />
        <Stack.Screen name="history" options={{ title: "History" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}