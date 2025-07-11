# Mobile Application - E-Commerce Platform 🛒

This is a mobile application built using Expo that serves as an E-Commerce platform.

## Project Description

This mobile app allows users to:
- Register and log in  
- Browse products  
- Add products to the cart  
- Manage their profile  
- Use location-based services  

## Technologies Used

### Frontend
- **React Native** – For mobile app development  
- **Expo** – React Native development platform  
- **Expo Router** – For navigation  
- **TypeScript** – For type safety  

### Backend & Database
- **Firebase Authentication** – For user authentication  
- **Firestore** – As the database  
- **Firebase** – For backend services  

### State Management
- **Redux Toolkit** – For global state management  
- **React Context** – For authentication context  

### UI/UX
- **React Native Maps** – Map functionality  
- **Expo Vector Icons** – Icons  
- **React Native Haptic Feedback** – Vibration feedback  

### Validation
- **Zod** – For form validation  

## Project Structure


mobile/
├── app/                # Main app files
│   ├── (tabs)/         # Tab navigation
│   ├── login.tsx       # Login screen
│   ├── register.tsx    # Registration screen
│   └── \_layout.tsx     # Main layout
├── components/         # Reusable components
├── contexts/           # React Contexts
├── hooks/              # Custom Hooks
├── services/           # API services
├── config/             # Configuration files
├── redux/              # Redux store and slices
└── styles/             # Style files


## Features

### 🔐 Authentication
- User registration  
- Login  
- Profile management  
- Logout  

### 🛍️ Products
- Product listing  
- Product detail view  
- Add to cart  

### 🛒 Cart
- Manage product quantities  
- Update cart  
- Calculate total price  

### 📍 Location
- Get current user location  
- Display on map  
- Get address from coordinates  

## Getting Started

1. Install dependencies:
```bash
npm install

2. Start the application:

npx expo start

3. Open the Expo Go app on your phone and scan the QR code

## Development Notes

* All pages are located inside the *app/* directory
* Reusable components are inside the *components/* directory
* Firebase services are inside the *services/* directory

## Firebase Configuration

This project uses Firebase for:

* Authentication
* Firestore database

Please add your Firebase configuration inside the config/firebase.ts file.

## License

This project is created for educational purposes.