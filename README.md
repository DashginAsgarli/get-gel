# Get Gel App

A ride-booking concept app modeled after services like Bolt. After selecting
a service from the Trip, Scooter, Plan, Food, or Send cards, the user enters
a pickup address, destination, and any additional stops, then chooses a
payment method (Cash or Card) and a ride type (GetGəl, Priority, XL, or Eco)
to see the calculated price and complete the request.

---

## Design System

- **Color** — `#1A4162` (brand navy) + Sky-400 accent
- **Font** — Plus Jakarta Sans
- **Dark Mode** — full support, persisted in localStorage
- **Animations** — fadeIn, splash exit, pulse ring
- **Premium effects** — gradient brand, food, market surfaces

---

## Architecture

State that needs to persist or be shared across screens (such as the current
booking flow and dark mode) is handled through **React Context**
(`src/context/`), rather than prop-drilling it through components. The map
view is built with **Leaflet** via `react-leaflet`, and routing between
top-level pages is handled by **React Router**.

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

---

## Tech Stack

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

---

## Get started

```bash
# 1. Clone the repository
git clone https://github.com/DashginAsgarli/get-gel.git

# 2. Navigate into the project
cd get-gel

# 3. Install dependencies
npm install

# 4. Run it
npm run dev      # localhost:5173
npm run build    # Production build
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

<div>

[![Email](https://img.shields.io/badge/Gmail-dashqinasgarli%40gmail.com-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dashqinasgarli@gmail.com)
&nbsp;

</div>
