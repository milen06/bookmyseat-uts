import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {
const scheme = useColorScheme();
const backgroundColor = scheme === "dark" ? "#0a0a0a" : "#ffffff";
const tint = scheme === "dark" ? "#d4d4d4" : "#111827";


return (
<GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
<Stack
screenOptions={{
headerStyle: { backgroundColor },
headerTintColor: tint,
contentStyle: { backgroundColor },
}}
>
<Stack.Screen name="index" options={{ title: "Book My Seat" }} />
<Stack.Screen name="booking/new" options={{ title: "New Booking" }} />
<Stack.Screen name="booking/[id]" options={{ title: "Booking Detail" }} />
<Stack.Screen name="history" options={{ title: "History" }} />
</Stack>
</GestureHandlerRootView>
);
}