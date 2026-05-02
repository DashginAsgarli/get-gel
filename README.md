# GetGəl — React + Tailwind Layihəsi

## 📁 Fayl Strukturu

```
getgel-app/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                          ← Başlanğıc nöqtəsi
    ├── App.jsx                           ← Routing + Provider wrapper
    ├── index.css                         ← Global stillər + Tailwind
    │
    ├── context/
    │   └── AppContext.jsx                ← Global state (user, cart, dark mode, toasts)
    │
    ├── data/
    │   └── mockData.js                   ← Mock məlumatlar (restoranlar, məhsullar, tariflər)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx                ← Yuxarı bar (logo, dark mode, geri düyməsi)
    │   │   └── Sidebar.jsx               ← Sol menü (Ödeme, Promosyonlar, Abonelikler...)
    │   │
    │   ├── ui/
    │   │   ├── Toast.jsx                 ← Bildiriş komponenti
    │   │   └── SplashScreen.jsx          ← Açılış ekranı (animasiyalı)
    │   │
    │   └── pages/
    │       ├── auth/
    │       │   ├── LoginPage.jsx         ← Giriş formu (validasiya ilə)
    │       │   └── RegisterPage.jsx      ← Qeydiyyat formu (validasiya ilə)
    │       │
    │       ├── home/
    │       │   └── HomePage.jsx          ← Xəritə + bottom sheet + sürüş axını
    │       │
    │       ├── food/
    │       │   └── FoodPage.jsx          ← Restoranlar + menü + səbət
    │       │
    │       ├── market/
    │       │   └── MarketPage.jsx        ← Bazar + məhsullar + səbət
    │       │
    │       ├── trips/
    │       │   └── TripsPage.jsx         ← Keçmiş yolculuqlar
    │       │
    │       └── profile/
    │           └── ProfilePage.jsx       ← Hesab + tablar (Ödeme, Promos, Abonelik, Güvenlik...)
```

## 🛣️ Routing (React Router)

| URL          | Səhifə              | Açıqlama                     |
|--------------|---------------------|------------------------------|
| `/`          | HomePage            | Xəritə + sürüş sifariş axını |
| `/login`     | LoginPage           | Giriş formu                  |
| `/register`  | RegisterPage        | Qeydiyyat formu              |
| `/food`      | FoodPage            | GetGəl Gıda                  |
| `/market`    | MarketPage          | GetGəl Pazarı                |
| `/trips`     | TripsPage           | Yolculuq tarixi              |
| `/profile`   | ProfilePage         | Hesab idarəetməsi            |

## 🎯 Funksiyalar

### Auth
- Login/Register formu validasiya ilə
- localStorage-da user məlumatı saxlanılır
- Giriş etmədən qorunan səhifələr redirect verir

### Ana Səhifə (Ride Flow)
1. Xidmət kartları (Yolculuklar, Scooterlar, Planla, Gıda, Send)
2. Ünvan daxil et (pickup + destination + əlavə dayanacaq)
3. Promo kod tətbiq et
4. Ödeme üsulu seç (Nağd / Kart)
5. Sürüş növü seç (GetGəl, Priority, XL, Eco) — qiymət hesablanır
6. Sürücü seçimi (multi/single)
7. Sürücü axtarılır → Sürücü tapıldı (zəng + mesaj)

### GetGəl Gıda
- Restoran siyahısı (kateqoriya + axtarış filtri)
- Restoran detay səhifəsi (menü)
- Səbətə məhsul əlavə/çıxar
- Sifariş ver

### GetGəl Pazarı  
- Məhsul grid (kateqoriya filtrası)
- Stok göstəricisi
- Ədəd artır/azalt
- Səbət modal + Sifariş

### Profile Tabları
- **Ödeme** — Kart/Nağd/Apple Pay/Google Pay
- **Promosyonlar** — Kod daxil et + mövcud promolar (GETGEL20, YENI10, FOOD15)
- **Abonelikler** — Basic/Pro/Business planlar
- **Güvenlik** — Telefon, E-poçt, Şifrə, 2FA
- **Destek** — Kateqoriya seç + Canlı chat
- **Hakkında** — Versiya + Siyasətlər

## 🎨 Dizayn Sistemi

- **Rəng**: `#1A4162` (brand navy) + Sky-400 aksent
- **Font**: Plus Jakarta Sans
- **Dark Mode**: Tam dəstək (localStorage-da saxlanılır)
- **Animasiyalar**: fadeIn, splash exit, pulse ring
- **Premium effektlər**: Gradient brand, food, market

## 📦 İstifadə edilən paketlər

```json
"react-router-dom": "^6.22.0"   ← Routing
"react-icons": "^5.0.1"          ← İkonlar (fi + fa)
"leaflet": "^1.9.4"              ← Xəritə
"react-leaflet": "^4.2.1"        ← React Leaflet
"tailwindcss": "^3.4.1"          ← Stillər
```

## 🚀 Başlatma

```bash
npm install
npm run dev      # localhost:5173
npm run build    # Production build
```