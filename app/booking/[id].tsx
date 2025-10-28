import React, { useMemo } from "react";
import { View, Text, Pressable, Alert, useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingStore } from "../../store/use-bookings";
import { formatCurrency } from "../../lib/format";

export default function BookingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings, removeBooking, toggleStatus } = useBookingStore();
  const booking = useMemo(() => bookings.find(x => x.id === id), [bookings, id]);
  const router = useRouter();
  const scheme = useColorScheme();

  if (!booking) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Booking not found.</Text>
      </View>
    );
  }

  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const border = scheme === "dark" ? "#1f2937" : "#e5e7eb";
  const total = booking.price * booking.quantity;

  return (
    <View style={{ flex: 1, padding: 16, gap: 14 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", color: text }}>
        {booking.title}
      </Text>
      <Text style={{ color: muted }}>
        {booking.venue} • {booking.date} • {booking.category}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: border,
          borderRadius: 12,
          padding: 14,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "700", color: text, marginBottom: 6 }}>
          Booking Details
        </Text>
        <Text style={{ color: muted }}>Name: {booking.customer_name}</Text>
        <Text style={{ color: muted }}>Email: {booking.customer_email}</Text>
        <Text style={{ color: muted }}>Quantity: {booking.quantity}</Text>
        <Text style={{ color: muted }}>
          Price per ticket: {formatCurrency(booking.price)}
        </Text>
        <Text style={{ color: text, fontWeight: "700", marginTop: 6 }}>
          Total: {formatCurrency(total)}
        </Text>
      </View>

      <Pressable
        onPress={() => toggleStatus(booking.id)}
        style={{
          backgroundColor: booking.paid ? "#16a34a" : "#e11d48",
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {booking.paid ? "Mark as Unpaid" : "Mark as Paid"}
        </Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          onPress={() => {
            Alert.alert("Delete Booking", `Delete “${booking.title}”?`, [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  removeBooking(booking.id);
                  Alert.alert("Deleted", "Booking removed.");
                  setTimeout(() => router.replace("/"), 200);
                },
              },
            ]);
          }}
          style={{
            flex: 1,
            backgroundColor: "#ef4444",
            borderRadius: 12,
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}