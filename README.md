# 📦 Fullstack Point of Sales (POS)

## 1. Gambaran Umum

Project **Fullstack Point of Sales (POS)** adalah aplikasi untuk mengelola proses penjualan toko secara digital, mulai dari manajemen produk, transaksi penjualan, hingga laporan dan dashboard analitik. Project ini dibuat sebagai latihan dan portofolio pengembangan **fullstack**, dengan fokus utama pada **backend** namun tetap dilengkapi frontend modern.

## 2. Fitur Utama

### 🔐 Authentication & Authorization

* Register & Login user
* JSON Web Token (JWT)
* Proteksi route (role-based jika diperlukan)

### 📦 Manajemen Produk

* Tambah, ubah, hapus produk (CRUD)
* Upload gambar produk
* Stok produk otomatis berkurang saat transaksi

### 🛒 Transaksi Penjualan

* Pembuatan transaksi
* Multi-item dalam satu transaksi
* Perhitungan total otomatis
* Metode pembayaran (cash / qris)

### 📊 Dashboard & Laporan

* Total penjualan
* Total transaksi
* Total produk terjual
* Pendapatan harian / bulanan
* Grafik penjualan

### 🧾 Riwayat Transaksi

* List transaksi
* Detail transaksi
* Filter berdasarkan tanggal

## 3. Teknologi yang Digunakan

### Backend

* Node.js
* Express.js
* MySQL
* JWT (Authentication)
* Multer (Upload file)
* Joi (Validasi data)
* bcrypt (hashing password)
* dotenv
* mysql2
* cloudinary (upload file/gambar)\
* cors

### Frontend

* React.js
* React Router
* Axios / Fetch API
* Tailwind CSS
* React charts
* Lucide react
* React-hot-toast
* Sweetalert2

## 4. Struktur Folder

### Backend

```
Server/
├── .vscode/
├── api/
├── node_modules/
├── src/
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── middleware/
│ ├── validations/
│ ├── utils/
│ ├── db/
│ └── app.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### Frontend

```
Client/
├── .vscode/
├── node_modules/
├── public/
├── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── layout/
│ ├── pages/
│ ├── utils/
│ ├── index.css
│ └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

## 5. Database Design

### Tabel Users

* id (PK)
* username
* password
* nama_depan
* nama_belakang
* role
* created_at

### Tabel Products

* id (PK)
* name
* price
* stock
* image
* created_at

### Tabel Transactions

* id (PK)
* user_id (FK)
* payment_method
* total_amount
* created_at

### Tabel Transaction_Items

* id (PK)
* transaction_id (FK)
* product_id (FK)
* quantity
* subtotal

## 6. Alur Sistem

1. Admin login
2. Admin memilih produk
3. Produk masuk ke list transaksi
4. Admin melakukan pembayaran
5. Transaksi tersimpan ke database
6. Stok produk berkurang
7. Data tampil di dashboard

## 7. API Endpoint (Contoh)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Products

* `GET /api/dashboard/products`
* `GET /api/dashboard/products/:id`
* `POST /api/dashboard/products/add`
* `PUT /api/dashboard/products/:id`
* `DELETE /api/dashboard/products/:id`

### Transactions

* `POST /api/dashboard/transaction`
* `GET /api/dashboard/transactions`
* `GET /api/dashboard/transactions/detail/:id`

### Dashboard

* `GET /api/dashboard`

### Report

* `GET /api/dashboard/report`
* `GET /api/dashboard/report/chart`

## 8. Cara Menjalankan Project

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

## 9. Environment Variable

```env
DB_HOST=your host
DB_USER=your user
DB_PASSWORD=your password
DB_NAME=pos_db
JWT_SECRET=your_secret_key
```


## 10. Catatan

Project ini dibuat untuk pembelajaran dan pengembangan skill **Fullstack Developer**, khususnya dalam memahami alur **backend, database, dan integrasi frontend-backend**.

---

✍️ Author: Muhamad Nur Rizki
