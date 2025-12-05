# 📱 SMS App - سامانه ضد سرقت

[![Build Status](https://github.com/atomicdeploy/smsapp/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/atomicdeploy/smsapp/actions)

An elegant, modern SMS control application for security systems built with **Ionic**, **Nuxt 3**, **Vue 3**, and **Capacitor**.

## ✨ Features

- 🎨 **Beautiful Dark Mode UI** - Modern, vibrant design with glass effects
- 🌐 **Multi-language Support** - Persian (فارسی) as primary, English as secondary
- 📱 **PWA Ready** - Install as a Progressive Web App
- 🤖 **Android Native** - Full Android support via Capacitor
- 🔄 **RTL/LTR Support** - Automatic direction based on language
- 📲 **SMS Control** - Control your security device via SMS
- 🔐 **Zone Management** - Manage multiple security zones
- 📜 **Event History** - Track all security events
- ⚡ **Quick Actions** - One-tap access to common functions

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) + [Vue 3](https://vuejs.org/)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/) + Custom SCSS
- **Native Bridge**: [Capacitor](https://capacitorjs.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **PWA**: [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/)
- **Styling**: SCSS with variables, mixins, and modern CSS

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- For Android builds: Java 17+, Android SDK

### Installation

```bash
# Clone the repository
git clone https://github.com/atomicdeploy/smsapp.git
cd smsapp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production (SSR)
npm run generate     # Generate static site
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # Type checking

# Capacitor / Android
npm run cap:sync           # Sync web assets to native
npm run cap:android        # Open Android Studio
npm run cap:add:android    # Add Android platform
npm run android:build      # Build debug APK
npm run android:build:release  # Build release APK
```

## 📁 Project Structure

```
smsapp/
├── assets/
│   └── scss/
│       └── main.scss      # Main SCSS with variables & mixins
├── components/
│   ├── TheHeader.vue      # App header with menu
│   ├── NavMenu.vue        # Bottom navigation
│   └── ServerAddressModal.vue
├── composables/           # Vue composables
├── layouts/
│   └── default.vue        # Main layout
├── locales/
│   ├── fa.json           # Persian translations
│   └── en.json           # English translations
├── pages/
│   ├── index.vue         # Home page
│   ├── zones.vue         # Zone management
│   ├── history.vue       # Event history
│   └── settings.vue      # App settings
├── plugins/              # Nuxt plugins
├── public/
│   ├── pwa/              # PWA icons
│   └── fonts/            # Custom fonts
├── stores/
│   └── settings.ts       # Pinia store
├── types/                # TypeScript types
├── app.vue               # Root component
├── app.config.ts         # App configuration
├── nuxt.config.ts        # Nuxt configuration
├── capacitor.config.json # Capacitor config
└── package.json
```

## 🎨 Styling

The app uses SCSS with:
- **CSS Custom Properties** for theming
- **Mixins** for reusable styles
- **BEM naming convention** for components
- **Dark mode first** design approach

Key color variables:
```scss
$color-primary: #6366f1;    // Indigo
$color-secondary: #14b8a6;  // Teal
$color-success: #22c55e;    // Green
$color-error: #ef4444;      // Red
```

## 🌍 Internationalization

Supports:
- 🇮🇷 **Persian (فارسی)** - RTL, primary language
- 🇬🇧 **English** - LTR, secondary language

Add new translations in `/locales/[lang].json`

## 📱 Android Build

```bash
# First-time setup
npm run cap:add:android

# Build and open in Android Studio
npm run cap:build:android
npm run cap:android

# Build APK directly
npm run android:build
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local configuration:

```env
NUXT_PUBLIC_API_URL=https://api.example.com
```

### Capacitor

Edit `capacitor.config.json` to customize:
- App ID
- App name
- Splash screen
- Status bar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- [Nuxt Team](https://nuxt.com/) for the amazing framework
- [Ionic Team](https://ionic.io/) for Capacitor
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn) for Persian typography
