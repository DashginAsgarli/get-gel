<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=4,12,24&height=220&section=header&text=Get%20Gel%20App&fontSize=54&fontColor=ffffff&fontAlignY=38&descAlignY=58&descSize=20&animation=fadeIn" width="100%"/>


<div align="center">

[![Live Demo](https://img.shields.io/badge/%20Live%20Demo-22c55e?style=for-the-badge)](https://dashginasgarli.github.io/get-gel/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![tailwindcss](https://img.shields.io/badge/tailwind%20css-00C7B7?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://netlify.com)

</div>

> [!NOTE]
> <ul>
> <li>Service cards (Trip, Scooter, Plan, Food, Send)</li>
> <li>Enter address (pickup + destination + additional stop)</li>
> <li>Select payment method (Cash / Card)</li>
> <li>Select ride type (GetGəl, Priority, XL, Eco) — price is calculated</li>
> </ul>


## 🎨 Design System

> [!NOTE]
> <ul>
> <li> <b>Color</b>: `#1A4162` (brand navy) + Sky-400 aksent </li>
> <li> <b>Font</b>: Plus Jakarta Sans </li>
> <li> <b>Dark Mode</b>: Tam dəstək (localStorage-da saxlanılır) </li>
> <li> <b>Animations</b>: fadeIn, splash exit, pulse ring </li>
> <li> <b>Premium effects</b>: Gradient brand, food, market </li>
> </ul>
  
---


## 📁 File Structure

```
└── src/
    ├── context/
    ├── data/
    ├── components/
    │   ├── layout/
    │   ├── ui/
    │   └── pages/
    │       ├── auth/
    │       ├── home/
    │       ├── food/
    │       ├── market/
    │       ├── trips/
    │       └── profile/
```

## 🛣️ Routing (React Router)

| URL          | Page                | Disclosure                   |
|--------------|---------------------|------------------------------|
| `/`          | HomePage            | Map + ride booking flow      |
| `/login`     | LoginPage           | Login form                   |
| `/register`  | RegisterPage        | Registration form            |
| `/food`      | FoodPage            | GetGel Food                  |
| `/market`    | MarketPage          | GetGel Market                |
| `/trips`     | TripsPage           | Travel date                  |
| `/profile`   | ProfilePage         | Account management           |




## Packages used

```json
"react-router-dom": "^6.22.0"   ← Routing
"react-icons": "^5.0.1"          ← Icons
"leaflet": "^1.9.4"              ← Map
"react-leaflet": "^4.2.1"        ← React Leaflet
"tailwindcss": "^3.4.1"          ← Styles
```

## Get started

```bash
npm install
npm run dev      # localhost:5173
npm run build    # Production build
```


<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=4,12,24&height=130&section=footer" width="100%"/>
