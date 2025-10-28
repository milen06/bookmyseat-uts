import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Booking {
  id: string;
  eventId: string;
  title: string;
  venue: string;
  date: string;
  category: string;
  price: number;
  quantity: number;
  customer_name: string;
  customer_email: string;
  paid: boolean;
}

export interface BookingInput {
  eventId: string;
  title: string;
  venue: string;
  date: string;
  category: string;
  price: number;
  quantity: number;
  customer_name: string;
  customer_email: string;
}

interface BookingState {
  bookings: Booking[];
  addBooking: (data: BookingInput) => void;
  removeBooking: (id: string) => void;
  toggleStatus: (id: string) => void;
  editBooking: (id: string, updated: BookingInput) => void;
}

// ID unik sederhana
const uid = () =>
  Math.random().toString(36).substring(2, 10) +
  Date.now().toString(36).substring(5);

// Zustand + AsyncStorage persist
export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],

      addBooking: (data) =>
        set((state) => ({
          bookings: [...state.bookings, { id: uid(), paid: false, ...data }],
        })),

      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      toggleStatus: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, paid: !b.paid } : b
          ),
        })),

      editBooking: (id, updated) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updated } : b
          ),
        })),
    }),
    {
      name: "bookings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);