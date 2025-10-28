import React from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { formatCurrency } from "../lib/format";
import type { Booking } from "../lib/types";

export default function BookingCard({ booking, onPress, onDelete, onTogglePaid }: {
  booking: Booking;
  onPress?: () => void;
  onDelete?: () => void;
  onTogglePaid?: () => void;
}) {
  const scheme = useColorScheme();
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const border = scheme === "dark" ? "#1f2937" : "#e5e7eb";

  const RightActions = () => (
    <View style={{ justifyContent: "center" }}>
      <Pressable onPress={onDelete} style={{ backgroundColor: "#ef4444", paddingHorizontal: 16, justifyContent: "center", height: "100%" }}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={RightActions} overshootRight={false}>
      <Pressable onPress={onPress} style={{ padding: 14, borderRadius: 12, backgroundColor: card, borderWidth: 1, borderColor: border }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ color: text, fontSize: 16, fontWeight: "700" }}>{booking.title}</Text>
            <Text style={{ color: muted }}>{booking.venue} • {booking.date}</Text>
            <Text style={{ color: text }}>{booking.quantity} × {formatCurrency(booking.price)} = {formatCurrency(booking.quantity * booking.price)}</Text>
          </View>
          <Pressable
            onPress={onTogglePaid}
            style={{ backgroundColor: booking.paid ? "#16a34a" : "#e11d48", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999 }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>{booking.paid ? "PAID" : "UNPAID"}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Swipeable>
  );
}