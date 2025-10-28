import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Alert, useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookingStore } from "../../store/use-bookings";
import { formatCurrency } from "../../lib/format";

export default function BookingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bookings, editBooking, removeBooking, toggleStatus } = useBookingStore();
  const b = useMemo(() => bookings.find(x => x.id === id), [bookings, id]);
  const router = useRouter();
  const scheme = useColorScheme();

  if (!b) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Booking not found.</Text>
      </View>
    );
  }

  const [title, setTitle] = useState(b.title);
  const [venue, setVenue] = useState(b.venue);
  const [date, setDate] = useState(b.date);
  const [quantity, setQuantity] = useState(String(b.quantity));
  const [category, setCategory] = useState(b.category);
  const [price, setPrice] = useState(String(b.price));

  const primary = "#2563eb";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";

  const save = () => {
    if (!title.trim() || !venue.trim() || !date.trim()) {
      Alert.alert("Validation", "Title, Venue and Date are required.");
      return;
    }
    editBooking(b.id, {
      title: title.trim(),
      venue: venue.trim(),
      date,
      quantity: Math.max(1, Number(quantity) || 1),
      category: category.trim() || "General",
      price: Math.max(0, Number(price) || 0),
    });
    Alert.alert("Saved", "Booking updated.");
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{b.title}</Text>
      <Text style={{ color: muted }}>{b.venue} • {b.date} • {b.category}</Text>
      <Text style={{ fontWeight: "600" }}>{b.quantity} × {formatCurrency(b.price)} = {formatCurrency(b.quantity * b.price)}</Text>

      <Pressable
        onPress={() => toggleStatus(b.id)}
        style={{ backgroundColor: b.paid ? "#16a34a" : "#e11d48", borderRadius: 12, paddingVertical: 10, alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>{b.paid ? "Mark as Unpaid" : "Mark as Paid"}</Text>
      </Pressable>

      <View style={{ height: 1, backgroundColor: "#e5e7eb", marginVertical: 8 }} />

      <Text style={{ fontSize: 16, fontWeight: "700" }}>Edit</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />
      <TextInput value={venue} onChangeText={setVenue} placeholder="Venue" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />
      <TextInput value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />
      <TextInput value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="Quantity" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />
      <TextInput value={category} onChangeText={setCategory} placeholder="Category" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />
      <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="Price" style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10 }} />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable onPress={save} style={{ flex: 1, backgroundColor: primary, borderRadius: 12, padding: 12, alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert("Delete Booking", `Delete \"${b.title}\"?`, [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => { removeBooking(b.id); Alert.alert("Deleted", "Booking removed."); setTimeout(() => router.replace("/"), 200); } },
            ]);
          }}
          style={{ flex: 1, backgroundColor: "#ef4444", borderRadius: 12, padding: 12, alignItems: "center" }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}