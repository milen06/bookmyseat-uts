export type Booking = {
  id: string;
  title: string;
  venue: string;
  date: string; // YYYY-MM-DD
  quantity: number;
  category: string;
  price: number; // per ticket
  paid: boolean;
};

export type BookingInput = Omit<Booking, "id" | "paid">;
