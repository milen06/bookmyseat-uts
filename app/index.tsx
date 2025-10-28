import React, { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, TextInput, Alert, useColorScheme } from "react-native";
import { Link, useRouter } from "expo-router";
import { useBookingStore } from "../store/use-bookings";
import BookingCard from "../components/booking-card";

export default function Home() {
  const { bookings, removeBooking, toggleStatus } = useBookingStore();
  const [query, setQuery] = useState("");
  const [onlyPaid, setOnlyPaid] = useState(false);
  const scheme = useColorScheme();
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings
      .filter(b => (onlyPaid ? b.paid : true))
      .filter(b =>
        q === ""
          ? true
          : [b.title, b.venue, b.category].some(v => v.toLowerCase().includes(q))
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [bookings, query, onlyPaid]);

  const bg = scheme === "dark" ? "#0a0a0a" : "#fafafa";
  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const primary = "#2563eb";

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search events, venue, category"
          placeholderTextColor={muted}
          style={{
            flex: 1,
            backgroundColor: card,
            color: text,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: scheme === "dark" ? "#1f2937" : "#e5e7eb",
          }}
        />
        <Pressable
          onPress={() => setOnlyPaid(p => !p)}
          style={{
            backgroundColor: onlyPaid ? primary : card,
            borderRadius: 12,
            paddingHorizontal: 14,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: onlyPaid ? primary : scheme === "dark" ? "#1f2937" : "#e5e7eb",
          }}
        >
          <Text style={{ color: onlyPaid ? "#ffffff" : text }}>Paid</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: text, fontSize: 18, fontWeight: "700" }}>Upcoming Bookings</Text>
        <Link href="/booking/new" asChild>
          <Pressable
            style={{ backgroundColor: primary, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>+ New</Text>
          </Pressable>
        </Link>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: muted }}>No bookings yet. Tap “+ New” to create one.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => router.push({ pathname: "/booking/[id]", params: { id: item.id } })}
            onDelete={() => {
              Alert.alert("Delete Booking", `Delete \"${item.title}\"?`, [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => removeBooking(item.id) },
              ]);
            }}
            onTogglePaid={() => toggleStatus(item.id)}
          />
        )}
      />

      <Link href="/history" asChild>
        <Pressable style={{ alignSelf: "center", padding: 10 }}>
          <Text style={{ color: muted }}>View History →</Text>
        </Pressable>
      </Link>
    </View>
  );
}