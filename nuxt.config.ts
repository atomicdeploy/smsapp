// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      title: 'سامانه ضد سرقت',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'اپلیکیشن کنترل پیامکی دستگاه ضد سرقت' },
        { name: 'theme-color', content: '#1a1a2e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/pwa/192x192.png' }
      ]
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@vite-pwa/nuxt',
    '@nuxt/eslint'
  ],

  css: [
    '~/assets/scss/main.scss'
  ],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  i18n: {
    locales: [
      { code: 'fa', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' }
    ],
    defaultLocale: 'fa',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root'
    }
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'سامانه ضد سرقت',
      short_name: 'SMS App',
      description: 'اپلیکیشن کنترل پیامکی دستگاه ضد سرقت',
      theme_color: '#1a1a2e',
      background_color: '#0f0f1a',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        {
          src: '/pwa/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: false,
      type: 'module'
    }
  },

  build: {
    transpile: ['pinia-plugin-persistedstate']
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  typescript: {
    strict: true,
    shim: false
  },

  compatibilityDate: '2024-12-05'
})
