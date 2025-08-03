<div align="center">
  
# **TechXpress**
#### Empowering Seamless Shopping Experiences, Redefining E-Commerce.

<p align="center">
  <img src="https://img.shields.io/github/last-commit/Kirollos-Nedaa/CAI2_SWD5_S10_Team3?style=flat-square">
  <img src="https://img.shields.io/badge/C%23-95.7%25-blue?style=flat-square">
  <img src="https://img.shields.io/github/languages/count/Kirollos-Nedaa/CAI2_SWD5_S10_Team3?style=flat-square">
</p>

### **Built with the tools and technologies**
<p align="center">
    <img src="https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-React%20Native-61DAFB?logo=react&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-ASP.NET%20MVC-5C2D91?logo=dotnet&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-Entity%20Framework-512BD4?logo=dotnet&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square">
    <img src="https://img.shields.io/badge/-Razor%20Pages-512BD4?logo=dotnet&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/badge/-C%23-239120?logo=c-sharp&logoColor=white&style=flat-square">
</div>

---

### 📚 **Table of Contents**

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Deployment Guide](#-deployment-guide)
- [Contribution](#-contribution)

---

### 🧾 **Overview**

**TechXpress** is a comprehensive e-commerce platform developed to streamline online shopping for both customers and administrators. This project combines a React Native mobile front-end (powered by Expo) with a robust ASP.NET MVC back-end, utilizing Entity Framework for data management and TailwindCSS for modern, responsive design. Customers can easily browse, search, and purchase products, while administrators benefit from intuitive tools for managing inventory, orders, and user accounts. TechXpress aims to deliver a secure, efficient, and user-friendly shopping experience.

---

### ✨ **Features**

- 🛒 **Product browsing and searching**: Discover products with advanced search and filtering.
- 👤 **User registration and authentication**: Secure sign-up, login, and profile management using ASP.NET Identity.
- 💳 **Secure checkout and payment integration**: Place orders with confidence using integrated payment gateways.
- 🛠 **Admin panel**: Manage products, categories, and orders with a dedicated dashboard.
- 📦 **Order tracking**: Users can view order history and track current orders.

---

### 🗂 **Project Structure**
```bash
```
TechXpress/
│
└── TechXpress.App/             # React Native mobile app (Expo)
    ├── assets/                 # Images, fonts, and static assets
    ├── components/             # Reusable React Native components
    ├── navigation/             # Navigation configuration (React Navigation)
    ├── screens/                # App screens (Home, Product, Cart, etc.)
    ├── services/               # API calls and utility functions
    ├── App.js                  # App entry point
    └── app.json                # Expo configuration
```
```

---
### **Deployment-guide**
Follow these steps to run TechXpress (React Native + Expo) locally:

### **Prerequisites**

- [Node.js & npm](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- (Optional) [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for device emulators

### **1. Clone the Repository**
```bash
git clone https://github.com/Kirollos-Nedaa/TechXpress-Mobile-App.git
cd TechXpress-Mobile-App
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment**

- If needed, create a `.env` file in the project root for API endpoints or secrets.
- Update API URLs in `services/` to point to your backend.

### **4. Start the Expo Development Server**
```bash
npx expo start
```
- Scan the QR code with the Expo Go app (iOS/Android) or run on an emulator.

### **5. Build for Production (Optional)**
```bash
npx expo build:android
npx expo build:ios
```
See [Expo docs](https://docs.expo.dev/) for more build options.

---

## 🤝 **Contribution**

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create a new branch**:  
   ```bash
   git checkout -b feature/YourFeatureName
   ```
**Guidelines:**
- Follow existing code style
- Include tests for new features
- Keep commit messages clear and descriptive

---

**Enjoy using TechXpress! For any issues or feature requests, please open an issue on GitHub.**