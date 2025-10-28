export function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `Rp ${n.toLocaleString("id-ID")}`;
  }
}
