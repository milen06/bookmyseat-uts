import React, { useMemo } from "react";
import { View, Text, FlatList, useColorScheme } from "react-native";
import { useBookingStore } from "../store/use-bookings";
import { formatCurrency } from "../lib/format";

export default function History() {
  const { bookings } = useBookingStore();
  const scheme = useColorScheme();
  const paid = useMemo(() => bookings.filter(b => b.paid), [bookings]);
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ color: text, fontSize: 18, fontWeight: "700" }}>Paid / Completed</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={paid}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: muted }}>No paid bookings yet.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ padding: 14, borderRadius: 12, backgroundColor: scheme === "dark" ? "#111827" : "#ffffff", borderWidth: 1, borderColor: scheme === "dark" ? "#1f2937" : "#e5e7eb" }}>
            <Text style={{ color: text, fontWeight: "700" }}>{item.title}</Text>
            <Text style={{ color: muted }}>{item.venue} • {item.date} • {item.category}</Text>
            <Text style={{ color: text }}>{item.quantity} × {formatCurrency(item.price)} = {formatCurrency(item.quantity * item.price)}</Text>
          </View>
        )}
      />
    </View>
  );
}
