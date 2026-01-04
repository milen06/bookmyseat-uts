import { create } from "zustand";
import { supabase } from "../lib/supabase";

export type Booking = {
  id: string;
  title: string;
  venue: string;
  category: string;
  customer_name: string;
  customer_email: string;
  quantity: number;
  price: number;
  paid: boolean;
  date: string;
};

type NewBooking = Omit<Booking, "id">;

type BookingStore = {
  bookings: Booking[];
  fetchBookings: () => Promise<void>;
  addBooking: (booking: NewBooking) => Promise<void>; 
  removeBooking: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],

  // READ
  fetchBookings: async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("fetchBookings error:", error);
      return;
    }

    set({ bookings: data ?? [] });
  },

  // CREATE ✅ (INI YANG HILANG)
  addBooking: async (booking) => {
    const { data, error } = await supabase
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error("addBooking error:", error);
      return;
    }

    set({ bookings: [...get().bookings, data] });
  },

  // DELETE
  removeBooking: async (id) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (!error) {
      set({
        bookings: get().bookings.filter((b) => b.id !== id),
      });
    }
  },

  // UPDATE
  toggleStatus: async (id) => {
    const booking = get().bookings.find((b) => b.id === id);
    if (!booking) return;

    const { error } = await supabase
      .from("bookings")
      .update({ paid: !booking.paid })
      .eq("id", id);

    if (!error) {
      set({
        bookings: get().bookings.map((b) =>
          b.id === id ? { ...b, paid: !b.paid } : b
        ),
      });
    }
  },
}));
