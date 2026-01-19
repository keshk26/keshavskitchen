# Keshav's Kitchen - Expo React Native App

Recipes and I have saved over time. View and filter recipes and save your favorites.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e440ffee-536d-47ea-ab58-5034a757c727" width="300" alt="Screenshot 1"></td>
    <td><img src="https://github.com/user-attachments/assets/8937d8c5-059b-4750-9253-6f8a15112581" width="300" alt="Screenshot 2"></td>
    <td><img src="https://github.com/user-attachments/assets/b5218734-45c9-4386-9c0f-f6df7224594f" width="300" alt="Screenshot 3"></td>
  </tr>
</table>

## Tech Stack and Architecture
This tech stack would be similar to a production app.  
- TypeScript
- Expo/Expo Router
- Firebase Firestore to store recipes
- Open AI to generate images
- Expo Vector Icons
- Expo Image
- Nativewind (Tailwind)
- React Native Testing Libarary / Jest
- Eslint, Prettier, Husky Pre-commit

Other tech considerations would be state management (Zustand or Redux), data fetching (TanStack Query), networking (SuperAgent/Axios), multi environment configuration and analytics libraries.

## To run the application

1. Email or message me to get the needed .env file.
2. Make sure Xcode or Android Studio is installed or install on a device with Expo Go. 
3. Note that this app was created on an older Intel Macbook so the dependencies are slightly older.
   - MacOS Ventura
   - Xcode 15.2
   - React Native 0.76.7
   - React 18.3.1
4. Install pnpm - https://pnpm.io/installation
   ```bash
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```
5. Install node_modules
   ```bash
   pnpm install
   ```
6. Start the app
   ```bash
   pnpm ios or pnpm android
   ```
