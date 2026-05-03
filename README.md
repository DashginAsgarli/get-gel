
# Get Gel App

<div>

[![Live Demo](https://img.shields.io/badge/%20Live%20Demo-22c55e?style=for-the-badge)](https://dashginasgarli.github.io/get-gel/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![tailwindcss](https://img.shields.io/badge/tailwind%20css-00C7B7?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://netlify.com)
</div>

##  Overview
After selecting a service from the Trip, Scooter, Plan, Food, or Send cards, enter the pickup address, destination, and any additional stops; then, choose your payment method (Cash or Card) and select a ride type (GetGəl, Priority, XL, or Eco) to see the calculated price and complete your request.


## Design System

> [!NOTE]
> <ul>
> <li> <b>Color</b>: `#1A4162` (brand navy) + Sky-400 aksent </li>
> <li> <b>Font</b>: Plus Jakarta Sans </li>
> <li> <b>Dark Mode</b>: Full support (stored in localStorage) </li>
> <li> <b>Animations</b>: fadeIn, splash exit, pulse ring </li>
> <li> <b>Premium effects</b>: Gradient brand, food, market </li>
> </ul>
  


## File Structure

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

## Routing (React Router)

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
"react-router-dom": "^6.22.0"    ← Routing
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
