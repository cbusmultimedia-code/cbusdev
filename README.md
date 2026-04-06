# Sentinel Secure - Key System

A high-security hardware key verification interface built with React, Vite, and Tailwind CSS.

## 🚀 Cara Deployment

### Opsi 1: Vercel (Paling Mudah)
1. Hubungkan akun GitHub Anda ke [Vercel](https://vercel.com).
2. Pilih repositori ini.
3. Tambahkan Environment Variable:
   - `GEMINI_API_KEY`: (API Key dari Google AI Studio)
4. Klik **Deploy**.

### Opsi 2: GitHub Pages
1. Buka **Settings** di repositori GitHub Anda.
2. Pilih **Pages** di sidebar kiri.
3. Pada bagian **Build and deployment**, pilih **GitHub Actions** sebagai sumber (Source).
4. Saya sudah menyertakan file workflow di `.github/workflows/deploy.yml`. Aplikasi akan otomatis ter-deploy setiap kali Anda melakukan push ke branch `main`.

## 🛠️ Teknologi yang Digunakan
- **React 19**
- **Vite** (Build tool)
- **Tailwind CSS 4** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

## 🔒 Fitur Keamanan (Simulasi)
- Verifikasi kunci perangkat keras (USB).
- Animasi progres verifikasi 0-100%.
- Dashboard status perangkat terenkripsi.
