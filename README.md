# ShoppingList

A minimal cross-platform **React Native** shopping list app. Add, view, and remove items with a clean, responsive UI. Supports **Android** and **iOS**.

## Features
- Add and remove items
- Scrollable list
- Simple, modern UI
- Fast and responsive
- Android & iOS support

## Screenshots
| Home | List |
|---|---|
| ![Home](docs/images/home.png) | ![List](docs/images/list.png) |

## Demo Video
https://www.youtube.com/watch?v=ahE8RejpoTw

## Requirements
- Node.js (LTS recommended)
- Yarn or npm
- React Native CLI environment: https://reactnative.dev/docs/environment-setup (CLI tab)
- **JDK 17**
- **Android Studio**: SDK Platform **34**, Build Tools **34.0.0**, Platform-Tools
- (macOS for iOS) Xcode + Command Line Tools

## Setup
```bash
git clone https://github.com/FerhatArslann/ShoppingList.git
cd ShoppingList
yarn install      # or: npm install
```

### Android
1. Android Studio → SDK Manager → install **Android 14 (API 34)**, **Build Tools 34.0.0**, **Platform-Tools**.
2. Ensure `ANDROID_HOME`/`ANDROID_SDK_ROOT` is set and `platform-tools` (adb) is on PATH.
3. **Debug keystore** (only if you hit signing errors). A default keystore is created automatically; to create it manually:

**Windows (CMD)**
```bat
mkdir "%USERPROFILE%\.android" 2>nul
keytool -genkey -v -keystore "%USERPROFILE%\.android\debug.keystore" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
```

**macOS/Linux**
```bash
mkdir -p ~/.android
keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
```

### iOS (macOS)
```bash
cd ios && pod install && cd ..
```

## Run

**Start Metro**
```bash
yarn start   # or: npm start
```

**Android**
```bash
yarn android   # or: npm run android
```

**iOS (macOS)**
```bash
yarn ios       # or: npm run ios
```

## Known-Good Android Versions
- compileSdkVersion: **34**
- buildToolsVersion: **34.0.0**
- JDK: **17**

## Troubleshooting
- **Dev server already running / port 8081**
  ```bash
  taskkill /F /IM node.exe   # Windows
  # or
  killall node               # macOS/Linux
  ```
- **Signing errors (`validateSigningDebug`, keystore not found/password)**
  Use the default debug keystore:
  - Windows: `%USERPROFILE%\.android\debug.keystore`
  - macOS/Linux: `~/.android/debug.keystore`
  Credentials: `storepass=android`, `keyAlias=androiddebugkey`, `keypass=android`.
- **SDK/ADB issues**
  ```bash
  adb kill-server && adb start-server && adb devices
  ```
- **Clean build**
  ```bash
  cd android && gradlew clean && cd ..
  yarn start --reset-cache
  ```
- **Environment diagnostics**
  ```bash
  npx react-native doctor
  npx react-native doctor --fix
  ```

## License
[MIT](LICENSE)
