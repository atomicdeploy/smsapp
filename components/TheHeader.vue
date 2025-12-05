<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()
const serverAddressModal = ref<{ isModalOpen: boolean } | null>(null)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const colorModeIcon = computed(() => {
  return colorMode.value === 'light' ? 'i-heroicons-moon' : 'i-heroicons-sun'
})

const colorModeText = computed(() => {
  return colorMode.value === 'light' ? t('settings.darkMode') : t('settings.lightMode')
})

const profileLinks = computed(() => [
  [
    {
      label: colorModeText.value,
      icon: colorModeIcon.value,
      click: toggleColorMode
    }
  ],
  [
    {
      label: t('settings.changeDeviceAddress'),
      icon: 'i-heroicons-device-phone-mobile',
      click: () => {
        if (serverAddressModal.value) {
          serverAddressModal.value.isModalOpen = true
        }
      }
    },
    {
      label: t('common.exit'),
      icon: 'i-heroicons-arrow-right-start-on-rectangle',
      to: '/logout'
    }
  ]
])
</script>

<template>
  <ServerAddressModal ref="serverAddressModal" />
  <header class="app-header">
    <div class="app-header__title">
      <UIcon name="i-heroicons-shield-check" class="icon" />
      <h1>{{ t('app.title') }}</h1>
    </div>
    <div class="flex-1" />
    <div class="app-header__actions">
      <UPopover>
        <UButton
          class="rounded-lg w-9 h-9 p-1"
          color="gray"
          variant="ghost"
          icon="i-heroicons-bars-3"
          :aria-label="t('common.menu')"
        />
        <template #panel>
          <div class="w-56 p-2">
            <UVerticalNavigation :links="profileLinks" />
          </div>
        </template>
      </UPopover>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  height: 56px;
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  padding-top: env(safe-area-inset-top);

  &__title {
    font-weight: 700;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      width: 22px;
      height: 22px;
      color: #6366f1;
    }

    h1 {
      margin: 0;
      font-size: inherit;
    }
  }
}

.light .app-header {
  background: rgba(255, 255, 255, 0.9);
  border-bottom-color: rgba(148, 163, 184, 0.2);
}
</style>
