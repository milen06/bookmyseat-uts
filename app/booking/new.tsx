import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useBookingStore } from "../../store/use-bookings";

export default function NewBooking() {
  const { addBooking } = useBookingStore(); // 🔹 panggil fungsi dari store
  const router = useRouter();
  const scheme = useColorScheme();

  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("General");
  const [price, setPrice] = useState("0");

  const card = scheme === "dark" ? "#111827" : "#ffffff";
  const text = scheme === "dark" ? "#e5e7eb" : "#111827";
  const muted = scheme === "dark" ? "#9ca3af" : "#6b7280";
  const border = scheme === "dark" ? "#1f2937" : "#e5e7eb";
  const primary = "#2563eb";

  const inputStyle = {
    backgroundColor: card,
    color: text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: border,
    marginBottom: 12,
  } as const;

  const submit = () => {
    // if (!title.trim() || !venue.trim() || !date.trim()) {
    //   Alert.alert("Validation", "Title, Venue and Date are required.");
    //   return;
    // }
    // if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    //   Alert.alert("Validation", "Date must be in YYYY-MM-DD format.");
    //   return;
    // }

    addBooking({
      title: title.trim(),
      venue: venue.trim(),
      date,
      quantity: Math.max(1, Number(quantity) || 1),
      category: category.trim() || "General",
      price: Math.max(0, Number(price) || 0),
    });

    Alert.alert("Success", "Booking created successfully.");
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Title *</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Venue *</Text>
        <TextInput
          value={venue}
          onChangeText={setVenue}
          placeholder="Venue name"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Date (YYYY-MM-DD) *</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2025-11-01"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Quantity</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="1"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Category</Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="General"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>Price (per ticket)</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={muted}
          style={inputStyle}
        />

        <Pressable
          onPress={submit}
          style={{
            backgroundColor: primary,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Save Booking</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
