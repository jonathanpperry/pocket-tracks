# PocketTracks

PocketTracks is a hybrid mobile audio application built with Angular, Ionic, and Capacitor.

## Tech stack

- Angular
- Ionic
- Capacitor
- TypeScript
- Android

## Development

Install dependencies:

```bash
npm install
```

Run the app in the browser:

```bash
npm start
```

Build the Angular application:

```bash
npm run build
```

## Android development

After building the web application, sync the latest changes to the Android project:

```bash
npx cap sync android
```

Open the native Android project in Android Studio:

```bash
npx cap open android
```

A typical Android development cycle is:

```bash
npm run build
npx cap sync android
npx cap open android
```

## Android app assets

PocketTracks uses `@capacitor/assets` to generate Android launcher icons, adaptive icons, and splash screen resources.

The source assets are stored in:

```text
assets/
├── icon-background.png
├── icon-foreground.png
├── icon-only.png
└── splash.png
```

After changing any launcher icon or splash artwork, regenerate the Android resources:

```bash
npx @capacitor/assets generate --android
```

Then sync Capacitor:

```bash
npx cap sync android
```

If Android Studio or the device launcher continues to show an old icon, uninstall PocketTracks from the device and reinstall it.

## Clean Android build

If Android build output becomes stale:

```bash
cd android
./gradlew clean
cd ..
```

On Windows PowerShell:

```powershell
cd android
.\gradlew clean
cd ..
```
