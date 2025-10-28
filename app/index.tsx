import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  useColorScheme,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useBookingStore } from "../store/use-bookings";
import { formatCurrency } from "../lib/format";

export default function Home() {
  const { bookings, removeBooking, toggleStatus } = useBookingStore();
  const [query, setQuery] = useState("");
  const [onlyPaid, setOnlyPaid] = useState(false);
  const scheme = useColorScheme();
  const router = useRouter();

  // Filter booking berdasarkan pencarian dan status
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings
      .filter((b) => (onlyPaid ? b.paid : true))
      .filter((b) =>
        q === ""
          ? true
          : [b.title, b.venue, b.category, b.customer_name, b.customer_email].some((v) =>
              v.toLowerCase().includes(q)
            )
      )
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [bookings, query, onlyPaid]);

  // Theme colors
  const bg = scheme === "dark" ? "#0a0a0a" : "#fafafa";
  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const primary = "#2563eb";

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16, gap: 12 }}>
      {/* Search bar dan filter */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search event, name, or email"
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
          onPress={() => setOnlyPaid((p) => !p)}
          style={{
            backgroundColor: onlyPaid ? primary : card,
            borderRadius: 12,
            paddingHorizontal: 14,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: onlyPaid
              ? primary
              : scheme === "dark"
              ? "#1f2937"
              : "#e5e7eb",
          }}
        >
          <Text style={{ color: onlyPaid ? "#ffffff" : text }}>Paid</Text>
        </Pressable>
      </View>

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            color: text,
            fontSize: 20,
            fontWeight: "700",
            letterSpacing: 0.3,
          }}
        >
          My Bookings
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          {/* Tombol View History */}
          <Link href="/history" asChild>
            <Pressable
              style={{
                backgroundColor: scheme === "dark" ? "#374151" : "#e5e7eb",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  color: scheme === "dark" ? "#f3f4f6" : "#111827",
                  fontWeight: "600",
                }}
              >
                History
              </Text>
            </Pressable>
          </Link>

          {/* Tombol New Booking */}
          <Link href="/booking/new" asChild>
            <Pressable
              style={{
                backgroundColor: primary,
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>+ Book</Text>
            </Pressable>
          </Link>
        </View>
      </View>


      {/* Daftar booking */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: muted }}>
              No bookings yet. Tap “+ Book” to create one.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: "/booking/[id]", params: { id: item.id } })
            }
            style={{
              backgroundColor: card,
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: scheme === "dark" ? "#1f2937" : "#e5e7eb",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: text,
                    fontSize: 16,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: muted, marginBottom: 2 }}>
                  {item.venue}
                </Text>
                <Text style={{ color: muted, fontSize: 12 }}>
                  {item.customer_name} ({item.customer_email})
                </Text>
                <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
                  {item.quantity} × {formatCurrency(item.price)} ={" "}
                  {formatCurrency(item.quantity * item.price)}
                </Text>
              </View>

              <Pressable
                onPress={() => toggleStatus(item.id)}
                style={{
                  backgroundColor: item.paid ? "#16a34a" : "#e11d48",
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>
                  {item.paid ? "Paid" : "Unpaid"}
                </Text>
              </Pressable>
            </View>

            {/* tombol hapus */}
            <Pressable
              onPress={() => {
                Alert.alert("Delete Booking", `Delete “${item.title}”?`, [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => removeBooking(item.id),
                  },
                ]);
              }}
              style={{ marginTop: 8 }}
            >
              <Text
                style={{
                  color: "#ef4444",
                  fontSize: 12,
                  textAlign: "right",
                  textDecorationLine: "underline",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}