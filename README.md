# Zaykaa – Where Every Bite is a Delight 🍽️

**Zaykaa** is a full-featured e-commerce platform designed to deliver a seamless online food ordering experience. Built using the powerful **MERN stack** (MongoDB, Express.js, React.js, Node.js), Zaykaa offers everything a modern food commerce site needs — from user-friendly navigation to secure payments and order tracking.
---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Test Zaykaa](#test-zaykaa)

---

## Features

- 🔐 **User Authentication**: Secure Sign Up, Login, Logout
- 🍱 **Browse Dishes by Category**: Appetizers, Main Course, Desserts, Beverages
- 🛒 **Cart Management**: Add, remove, and update food items in your cart
- 💳 **Online Payments**: Integrated PayPal checkout
- 📦 **Order Placement and History**: Track your past and current orders
- 📱 **Modern UI**: Modern UI which increases user experience

---

## Installation

To set up Zaykaa locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VedantDewangan/Zaykaa.git
   ```

2. **Install server dependencies**:
   ```bash
   cd Zaykaa/backend
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**:

   In the `backen` folder, create a `.env` file:
   ```env
   PAYPAL_CLIENT_ID=your_port_number
   PAYPAL_API=paypal_api
   PAYPAL_SECRET=your_paypal_secret_id
   MONGODB_URI=your_mongodb_uri
   ```

5. **Start the development servers**:

   - Backend:
     ```bash
     node server.js
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

---

## Usage

1. Visit `http://localhost:5173` or your deployed URL.
2. Register or log in to your account.
3. Explore the menu and add food items to your cart or wishlist.
4. Place your order using Paypal.
5. Track your order status in the **Orders** section.

---

## Screenshots

### 🍽️ Home Page
![Home Page](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(46).png)

### 🧑‍🍳 Menu Page
![Menu](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(47).png)

### 🧑‍🍳 User Login Page
![Login](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(48).png)

### 🛒 Cart
![Cart](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(49).png)

### 💳 Payment
![Payment](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(50).png)

### 📦 Order History
![Orders](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(51).png)

### 📦 Admin Login Page
![Admin Login Page](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(52).png)

### 📦 Menu Management
![Menu Management](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(53).png)

### 📦 Add New Food Item
![Add New Food Item](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(54).png)

### 📦 Manage Order
![Manage Order](https://github.com/VedantDewangan/Zaykaa/blob/master/Screenshot%20(55).png)

---

## Contributing

Contributions are welcome and appreciated!

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request.

---

## Test Zaykaa

Check out the live demo: [Zaykaa on Netlify](https://zaykaa.netlify.app)

---
