# SOLE_ARCHIVE® | Premium Sneaker Drop Frontend

![Project Status](https://img.shields.io/badge/status-production-00cc00?style=flat-square)
![Tech Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue?style=flat-square)

**SOLE_ARCHIVE** is a portfolio-level frontend application simulating a high-end "hype" streetwear store. It features a "Drop" mechanic, a fully functional shopping cart state, real-time filtering, and a custom authentication flow without backend dependencies.

## 🚀 Features

### Core Experience
* **"Drop" Mechanics:** Live countdown timer and "Raffle Entry" system for exclusive items.
* **Dynamic Catalog:** Real-time filtering by Brand (Nike, Adidas, etc.) and Price Range.
* **Cart System:** Persistent shopping cart (SessionStorage) with add/remove functionality and dynamic totals.

### UI/UX
* **Acid Green & Dark Mode:** A modern, high-contrast "Hypebeast" aesthetic.
* **Glassmorphism:** Blurred backdrops on sticky navigation and modals.
* **Interactive Modals:** Custom pop-ups for Login, Sign Up, Product Details, and Success messages (replacing native browser alerts).

### Technical
* **Vanilla JavaScript Architecture:** No frameworks used. State is managed via a central `db` array and `sessionStorage`.
* **Responsive Grid:** Fully responsive CSS Grid layout for Mobile, Tablet, and Desktop.
* **Form Validation:** Custom logic for matching passwords on Sign Up.

## 🛠 Tech Stack

* **Structure:** Semantic HTML5
* **Style:** CSS3 (CSS Variables, Flexbox, Grid, Backdrop-Filter)
* **Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, LocalStorage)
* **Assets:** FontAwesome (Icons), Unsplash (High-Res Images), Google Fonts (Oswald & Inter)

## 📂 Project Structure

```text
/sole-archive
│
├── index.html          # Main Landing Page (Hero, Flash Sales)
├── categories.html     # Full Catalog (Filters, Grid)
├── style.css           # Global Styles & Animations
├── app.js              # Business Logic (Cart, Auth, Rendering)
└── README.md           # Documentation
