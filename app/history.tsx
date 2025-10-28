import React, { useMemo } from "react";
import { View, Text, FlatList, useColorScheme } from "react-native";
import { useBookingStore } from "../store/use-bookings";
import { formatCurrency } from "../lib/format";

export default function History() {
  const { bookings } = useBookingStore();
  const scheme = useColorScheme();

  // Filter hanya booking yang sudah dibayar
  const paid = useMemo(() => bookings.filter((b) => b.paid), [bookings]);

  // Theme colors
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const bg = scheme === "dark" ? "#0a0a0a" : "#fafafa";
  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const border = scheme === "dark" ? "#1f2937" : "#e5e7eb";

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      <Text style={{ color: text, fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
        Paid / Completed Bookings
      </Text>

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
              {/* Judul event */}
              <Text style={{ color: text, fontWeight: "700", fontSize: 16 }}>
                {item.title}
              </Text>
              <Text style={{ color: muted, marginBottom: 4 }}>
                {item.venue} • {item.date} • {item.category}
              </Text>

              {/* Info customer */}
              <View style={{ marginBottom: 6 }}>
                <Text style={{ color: text, fontWeight: "600" }}>
                  {item.customer_name}
                </Text>
                <Text style={{ color: muted, fontSize: 12 }}>
                  {item.customer_email}
                </Text>
              </View>

              {/* Info harga */}
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