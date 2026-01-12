import React, { useMemo } from "react";
import { View, Text, FlatList, useColorScheme, Pressable } from "react-native";
import { router } from "expo-router";
import { useBookingStore } from "../store/use-bookings";
import { formatCurrency } from "../lib/format";

export default function History() {
  const { bookings } = useBookingStore();
  const scheme = useColorScheme();

  const paid = useMemo(() => bookings.filter((b) => b.paid), [bookings]);

  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const bg = scheme === "dark" ? "#0a0a0a" : "#fafafa";
  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const border = scheme === "dark" ? "#1f2937" : "#e5e7eb";
  const primary = "#2563eb";

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ color: text, fontSize: 18, fontWeight: "700" }}>
          Paid / Completed Bookings
        </Text>

        <Pressable
          onPress={() => router.push("/booking/new")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: primary,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            + New Booking
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={paid}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: muted }}>No paid bookings yet.</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const total = item.quantity * item.price;
          return (
            <View
              style={{
                padding: 14,
                borderRadius: 12,
                backgroundColor: card,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Text style={{ color: text, fontWeight: "700", fontSize: 16 }}>
                {item.title}
              </Text>
              <Text style={{ color: muted, marginBottom: 4 }}>
                {item.venue} • {item.date} • {item.category}
              </Text>

              <View style={{ marginBottom: 6 }}>
                <Text style={{ color: text, fontWeight: "600" }}>
                  {item.customer_name}
                </Text>
                <Text style={{ color: muted, fontSize: 12 }}>
                  {item.customer_email}
                </Text>
              </View>

              <Text style={{ color: muted, fontSize: 13 }}>
                {item.quantity} × {formatCurrency(item.price)}
              </Text>
              <Text
                style={{
                  color: text,
                  fontWeight: "700",
                  marginTop: 4,
                  fontSize: 14,
                }}
              >
                Total: {formatCurrency(total)}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
