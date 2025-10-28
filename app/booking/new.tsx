import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useBookingStore } from "../../store/use-bookings";

// Daftar event yang sudah ada (bisa dari API nantinya)
const EVENTS = [
  {
    id: "e1",
    title: "Bali Music Festival",
    venue: "Lapangan Renon, Denpasar",
    date: "2025-11-20",
    category: "VIP",
    price: 250000,
  },
  {
    id: "e2",
    title: "Tech Conference 2025",
    venue: "Gedung Dharma Negara Alaya",
    date: "2025-12-02",
    category: "Regular",
    price: 150000,
  },
  {
    id: "e3",
    title: "Stand Up Comedy Night",
    venue: "Teater Taman Budaya Bali",
    date: "2025-11-10",
    category: "Standard",
    price: 100000,
  },
];

export default function NewBooking() {
  const { addBooking } = useBookingStore();
  const router = useRouter();
  const scheme = useColorScheme();

  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(
    null
  );
  const [quantity, setQuantity] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

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
    if (!selectedEvent) {
      Alert.alert("Validation", "Please select an event.");
      return;
    }
    if (!customerName.trim() || !customerEmail.trim()) {
      Alert.alert("Validation", "Please fill your name and email.");
      return;
    }

    addBooking({
      eventId: selectedEvent.id,
      title: selectedEvent.title,
      venue: selectedEvent.venue,
      date: selectedEvent.date,
      category: selectedEvent.category,
      price: selectedEvent.price,
      quantity: Math.max(1, Number(quantity) || 1),
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim(),
    });

    Alert.alert("Success", "Your booking has been created!");
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
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ color: text, fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Select Event
        </Text>

        {EVENTS.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            onPress={() => setSelectedEvent(ev)}
            style={{
              padding: 14,
              borderWidth: 1,
              borderColor: selectedEvent?.id === ev.id ? primary : border,
              borderRadius: 12,
              backgroundColor:
                selectedEvent?.id === ev.id ? primary + "22" : card,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: text, fontWeight: "700", fontSize: 16 }}>
              {ev.title}
            </Text>
            <Text style={{ color: muted }}>
              {ev.venue} • {ev.date}
            </Text>
            <Text style={{ color: text }}>
              {ev.category} - Rp {ev.price.toLocaleString("id-ID")}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedEvent && (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: border,
                borderRadius: 12,
                padding: 14,
                marginBottom: 14,
              }}
            >
              <Text style={{ color: text, fontWeight: "700", marginBottom: 6 }}>
                Selected Event:
              </Text>
              <Text style={{ color: text }}>{selectedEvent.title}</Text>
              <Text style={{ color: muted }}>{selectedEvent.venue}</Text>
              <Text style={{ color: muted }}>
                {selectedEvent.category} • Rp{" "}
                {selectedEvent.price.toLocaleString("id-ID")}
              </Text>
            </View>

            <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>
              Quantity
            </Text>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={muted}
              style={inputStyle}
            />

            <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>
              Your Name
            </Text>
            <TextInput
              value={customerName}
              onChangeText={setCustomerName}
              placeholder="Enter your full name"
              placeholderTextColor={muted}
              style={inputStyle}
            />

            <Text style={{ color: text, fontSize: 16, marginBottom: 6 }}>
              Your Email
            </Text>
            <TextInput
              value={customerEmail}
              onChangeText={setCustomerEmail}
              placeholder="example@mail.com"
              placeholderTextColor={muted}
              keyboardType="email-address"
              style={inputStyle}
            />

            <TouchableOpacity
              onPress={submit}
              activeOpacity={0.8}
              style={{
                backgroundColor: primary,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Confirm Booking
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}