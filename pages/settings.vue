<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()
const settingsStore = useSettingsStore()
const toast = useToast()

useHead({
  title: t('nav.settings')
})

const currentLanguage = computed(() => locale.value)
const isDarkMode = computed(() => colorMode.value === 'dark')

const toggleDarkMode = () => {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark'
}

const changeLanguage = async (lang: string) => {
  await setLocale(lang)
  toast.add({
    title: t('success.languageChanged'),
    icon: 'i-heroicons-check-circle',
    color: 'emerald'
  })
}

const serverAddressModal = ref<{ isModalOpen: boolean } | null>(null)

const openAddressModal = () => {
  if (serverAddressModal.value) {
    serverAddressModal.value.isModalOpen = true
  }
}

const clearHistory = () => {
  toast.add({
    title: t('success.historyCleared'),
    icon: 'i-heroicons-check-circle',
    color: 'emerald'
  })
}

const appVersion = '1.0.0'
</script>

<template>
  <div class="p-4">
    <ServerAddressModal ref="serverAddressModal" />

    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <span>⚙️</span>
      {{ t('settings.title') }}
    </h1>

    <!-- Appearance -->
    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-400 flex items-center gap-2">
        <span>🎨</span>
        {{ t('settings.appearance') }}
      </h2>
      <UCard>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-3">
            <UIcon :name="isDarkMode ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="text-xl" />
            <span class="font-medium">{{ t('settings.darkModeTitle') }}</span>
          </div>
          <UToggle
            :model-value="isDarkMode"
            color="primary"
            @update:model-value="toggleDarkMode"
          />
        </div>
      </UCard>
    </section>

    <!-- Language -->
    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-400 flex items-center gap-2">
        <span>🌐</span>
        {{ t('settings.language') }}
      </h2>
      <UCard>
        <div class="space-y-2">
          <button
            class="lang-option"
            :class="{ 'lang-option--active': currentLanguage === 'fa' }"
            @click="changeLanguage('fa')"
          >
            <span class="text-xl">🇮🇷</span>
            <span class="font-medium">فارسی</span>
            <UIcon v-if="currentLanguage === 'fa'" name="i-heroicons-check" class="ms-auto text-primary-500" />
          </button>
          <button
            class="lang-option"
            :class="{ 'lang-option--active': currentLanguage === 'en' }"
            @click="changeLanguage('en')"
          >
            <span class="text-xl">🇬🇧</span>
            <span class="font-medium">English</span>
            <UIcon v-if="currentLanguage === 'en'" name="i-heroicons-check" class="ms-auto text-primary-500" />
          </button>
        </div>
      </UCard>
    </section>

    <!-- Device Settings -->
    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-400 flex items-center gap-2">
        <span>📱</span>
        {{ t('settings.device') }}
      </h2>
      <UCard>
        <div class="space-y-4">
          <button class="setting-item" @click="openAddressModal">
            <UIcon name="i-heroicons-device-phone-mobile" class="text-xl" />
            <div class="flex-1 text-start">
              <p class="font-medium">{{ t('settings.deviceAddress') }}</p>
              <p class="text-sm text-gray-400">{{ settingsStore.serverAddress || t('settings.notSet') }}</p>
            </div>
            <UIcon name="i-heroicons-chevron-left" class="text-gray-400" />
          </button>
        </div>
      </UCard>
    </section>

    <!-- Data -->
    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-400 flex items-center gap-2">
        <span>💾</span>
        {{ t('settings.data') }}
      </h2>
      <UCard>
        <button class="setting-item text-red-400 hover:text-red-300" @click="clearHistory">
          <UIcon name="i-heroicons-trash" class="text-xl" />
          <span class="flex-1 text-start font-medium">{{ t('settings.clearHistory') }}</span>
          <UIcon name="i-heroicons-chevron-left" class="text-gray-400" />
        </button>
      </UCard>
    </section>

    <!-- About -->
    <section class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-400 flex items-center gap-2">
        <span>ℹ️</span>
        {{ t('settings.about') }}
      </h2>
      <UCard>
        <div class="text-center py-4">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-shield-check" class="text-3xl text-primary-500" />
          </div>
          <h3 class="font-bold text-lg">{{ t('app.title') }}</h3>
          <p class="text-sm text-gray-400 mt-1">{{ t('settings.version') }} {{ appVersion }}</p>
          <p class="text-xs text-gray-500 mt-2">{{ t('settings.copyright') }}</p>
        </div>
      </UCard>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$color-primary: #6366f1;
$color-border: rgba(99, 102, 241, 0.15);

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba($color-primary, 0.1);
  }

  &--active {
    background: rgba($color-primary, 0.15);
    border-color: rgba($color-primary, 0.3);
  }
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: $color-primary;
  }
}
</style>
