# 🎟️ Book My Seat

> Aplikasi **Booking Tiket** berbasis **React Native + Expo Router**, dengan penyimpanan lokal **AsyncStorage**, dan manajemen state menggunakan **Zustand**.  
> Dirancang untuk memudahkan pengguna dalam menambah, mengedit, dan mengelola pemesanan tiket acara (event) secara **offline & persistent**.

---

## 🧭 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
3. [Struktur Folder](#-struktur-folder)
4. [Instalasi & Menjalankan Proyek](#️-instalasi--menjalankan-proyek)
5. [Penjelasan Fitur per Halaman](#-penjelasan-fitur-per-halaman)
6. [Manajemen State dengan Zustand](#️-manajemen-state-dengan-zustand)
7. [Penyimpanan Data dengan AsyncStorage](#-penyimpanan-data-dengan-asyncstorage)
8. [Preview UI](#-preview-ui)
9. [Lisensi & Catatan](#-lisensi--catatan)

---

## 🌟 Fitur Utama

| Fitur | Deskripsi |
|-------|------------|
| ➕ **Tambah Booking** | Pengguna dapat menambahkan data pemesanan baru (event, tempat, tanggal, kategori, jumlah, harga). |
| 📝 **Edit Booking** | Mengubah detail pemesanan yang sudah dibuat, langsung tersimpan otomatis ke penyimpanan lokal. |
| 💰 **Tandai Lunas / Belum Lunas** | Tombol toggle untuk menandai status pembayaran tiket. |
| 🗑️ **Hapus Booking** | Menghapus data pemesanan yang tidak diperlukan. |
| 🔍 **Pencarian dan Filter** | Cari event berdasarkan nama, venue, atau kategori; filter hanya yang sudah dibayar. |
| 📜 **Daftar Riwayat (History)** | Menampilkan daftar booking yang sudah berstatus *Paid*. |
| 💾 **Penyimpanan Persisten** | Data tidak akan hilang meskipun aplikasi ditutup karena menggunakan AsyncStorage. |
| 🌙 **Dark & Light Mode** | Warna antarmuka otomatis menyesuaikan dengan tema perangkat. |
| 🧭 **Navigasi Expo Router** | Transisi antar halaman (Home, New Booking, Detail, History) menggunakan file-based routing. |

---

## 🧰 Teknologi yang Digunakan

| Teknologi | Kegunaan |
|------------|-----------|
| ⚛️ **React Native (Expo)** | Framework utama untuk pengembangan aplikasi mobile lintas platform. |
| 🧭 **Expo Router** | Navigasi berbasis file (mirip Next.js) untuk transisi antar halaman. |
| 💾 **AsyncStorage** | Penyimpanan lokal untuk menyimpan data booking secara persisten. |
| ⚙️ **Zustand** | State management sederhana dan efisien untuk menyimpan data booking. |
| 🎨 **React Native Gesture Handler** | Untuk interaksi swipe-to-delete dan gesture UI. |

---

## 📁 Struktur Folder

```
bookmyseat-uts/
│
├── app/
│   ├── _layout.tsx              # Struktur utama navigasi
│   ├── index.tsx                # Halaman utama (daftar booking)
│   ├── booking/
│   │   ├── new.tsx              # Form tambah booking
│   │   ├── [id].tsx             # Detail dan edit booking
│   └── history.tsx              # Halaman riwayat booking
│
├── components/
│   └── booking-card.tsx          # Komponen kartu daftar booking
│
├── store/
│   └── use-bookings.ts          # Store Zustand + AsyncStorage
│
├── lib/
│   ├── format.ts                # Utility format mata uang
│   └── types.ts                 # Type definitions (TypeScript)
│
├── package.json
└── README.md
```

---

## ⚙️ Instalasi & Menjalankan Proyek

### 1️⃣ Persiapan Lingkungan
Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/)
- Emulator Android / Expo Go (untuk testing)

### 2️⃣ Clone Repository
```bash
git clone https://github.com/username/book-my-seat.git
cd book-my-seat
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Jalankan Aplikasi
```bash
npm run start
```

Pilih salah satu:
- Tekan `a` untuk Android Emulator  
- Tekan `i` untuk iOS Simulator  
- Atau scan QR menggunakan **Expo Go App**

---

## 📱 Penjelasan Fitur per Halaman

### 🏠 **Home (index.tsx)**
- Menampilkan daftar semua booking.
- Input pencarian dan filter hanya booking “Paid”.
- Swipe kiri untuk menghapus booking.
- Tombol “+ New” menuju halaman tambah data.

### 🆕 **New Booking (booking/new.tsx)**
- Form untuk menambahkan event baru.
- Validasi input (title, venue, date).
- Data otomatis tersimpan ke AsyncStorage.

### 🧾 **Booking Detail (booking/[id].tsx)**
- Menampilkan detail lengkap pemesanan.
- Bisa **edit**, **hapus**, dan **toggle status paid/unpaid**.
- Semua perubahan langsung tersimpan secara persisten.

### 📚 **History (history.tsx)**
- Menampilkan hanya data booking dengan status “Paid”.
- Digunakan sebagai catatan riwayat transaksi.

---

## 🧠 Manajemen State dengan Zustand

Zustand digunakan untuk menyimpan dan mengelola data booking tanpa perlu Redux.

```ts
export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (data) => set((state) => ({
        bookings: [...state.bookings, { id: uid(), paid: false, ...data }],
      })),
    }),
    { name: "bookings-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

✅ Keunggulan:
- Tidak ribet seperti Redux  
- Terintegrasi langsung dengan AsyncStorage  
- Perubahan data langsung sinkron di seluruh halaman

---

## 💽 Penyimpanan Data dengan AsyncStorage

Semua data booking disimpan **lokal di perangkat**, jadi tetap tersimpan meskipun aplikasi ditutup.

Key penyimpanan:  
```ts
name: "bookings-storage"
```

Untuk reset data saat testing:
```ts
import AsyncStorage from "@react-native-async-storage/async-storage";
await AsyncStorage.clear();
```

---

## 🎨 Preview UI

| Tampilan | Deskripsi |
|-----------|------------|
| 🏠 **Home** | Daftar booking + search + filter |
| ➕ **New Booking** | Form tambah data tiket |
| 🧾 **Detail** | Edit, delete, toggle paid |
| 📚 **History** | Riwayat booking yang sudah lunas |


---

## 🎥 Video Demo

Lihat demo aplikasi melalui tautan berikut:

👉 [Loom Video Demo](https://www.loom.com/share/b6f4d0c03d984aa08f412cd12e2e3ff1)


---

## 📜 Lisensi & Catatan

📄 **Lisensi:** MIT  
🧑‍💻 **Dibuat oleh:** Ema Maleni <br>
📅 **Tahun:** 2025  

> Aplikasi ini dikembangkan untuk kebutuhan pembelajaran dan proyek praktikum.  
> Semua data hanya disimpan secara lokal di perangkat pengguna.  

---

## 💬 Catatan Akhir
Aplikasi ini mengimplementasikan **konsep CRUD lengkap**, **dark mode adaptif**, dan **persistensi data lokal**,  
sesuai dengan kriteria penilaian proyek mobile development modern.  

> “Coding bukan hanya soal fitur, tapi bagaimana pengalaman pengguna terasa menyenangkan.” 🚀
