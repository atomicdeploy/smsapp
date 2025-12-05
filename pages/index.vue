<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('nav.home')
})

interface ZoneItem {
  title: string
  icon: string
  key: string
  emoji: string
}

const pageState = reactive({
  isEnabled: false,
  isPageReady: false,
  activeZones: [] as string[],
  isLoading: false
})

const zones = computed<ZoneItem[]>(() => [
  {
    title: t('zones.zone1'),
    icon: 'i-heroicons-shield-check',
    key: 'zone1',
    emoji: '🔒'
  },
  {
    title: t('zones.zone2'),
    icon: 'i-heroicons-shield-check',
    key: 'zone2',
    emoji: '🛡️'
  },
  {
    title: t('zones.zone3'),
    icon: 'i-heroicons-shield-check',
    key: 'zone3',
    emoji: '🔐'
  },
  {
    title: t('zones.zone4'),
    icon: 'i-heroicons-shield-check',
    key: 'zone4',
    emoji: '⚡'
  },
  {
    title: t('zones.zone5'),
    icon: 'i-heroicons-shield-check',
    key: 'zone5',
    emoji: '✨'
  }
])

const activeStyle = computed(() => {
  return pageState.isEnabled ? 'activation-card--active' : ''
})

const getInformation = async () => {
  pageState.isLoading = true
  // Simulate fetching data
  await new Promise(resolve => setTimeout(resolve, 1000))
  pageState.isPageReady = true
  pageState.isLoading = false
}

const toggleZone = (key: string) => {
  const index = pageState.activeZones.indexOf(key)
  if (index === -1) {
    pageState.activeZones.push(key)
  } else {
    pageState.activeZones.splice(index, 1)
  }
}

const isZoneActive = (key: string) => {
  return pageState.activeZones.includes(key)
}
</script>

<template>
  <div class="p-4">
    <!-- Activation Card -->
    <UCard class="activation-card" :class="activeStyle">
      <div class="activation-card__content">
        <label for="activate" class="activation-card__label">
          <span class="emoji">{{ pageState.isEnabled ? '✅' : '⚪' }}</span>
          {{ t('home.activation') }}
        </label>
        <div class="activation-card__toggle">
          <Transition name="fade" mode="out-in">
            <span v-if="pageState.isPageReady" class="flex items-center">
              <UToggle
                id="activate"
                v-model="pageState.isEnabled"
                color="emerald"
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                size="xl"
              />
            </span>
            <UButton
              v-else
              variant="soft"
              color="primary"
              :loading="pageState.isLoading"
              @click="getInformation()"
            >
              <UIcon name="i-heroicons-arrow-path-20-solid" class="me-1" />
              {{ t('home.getInfo') }}
            </UButton>
          </Transition>
        </div>
      </div>
    </UCard>

    <!-- Zone Selection -->
    <div class="mt-6">
      <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span class="emoji">🎯</span>
        {{ t('home.selectZones') }}
      </h2>
      <Swiper
        :slides-per-view="'auto'"
        :space-between="8"
        class="w-full"
      >
        <SwiperSlide v-for="zone in zones" :key="zone.key">
          <div
            class="zone-option"
            :class="{ 'zone-option--active': isZoneActive(zone.key) }"
            @click="toggleZone(zone.key)"
          >
            <span class="zone-option__emoji">{{ zone.emoji }}</span>
            <UIcon :name="zone.icon" class="zone-option__icon" />
            <span class="zone-option__title">{{ zone.title }}</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span class="emoji">⚡</span>
        {{ t('home.quickActions') }}
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <UCard class="action-card cursor-pointer hover:scale-[1.02] transition-transform">
          <div class="flex flex-col items-center gap-2 p-2">
            <UIcon name="i-heroicons-bell-alert" class="text-3xl text-warning-500" />
            <span class="font-medium text-sm">{{ t('home.testAlarm') }}</span>
          </div>
        </UCard>
        <UCard class="action-card cursor-pointer hover:scale-[1.02] transition-transform">
          <div class="flex flex-col items-center gap-2 p-2">
            <UIcon name="i-heroicons-signal" class="text-3xl text-success-500" />
            <span class="font-medium text-sm">{{ t('home.checkStatus') }}</span>
          </div>
        </UCard>
        <UCard class="action-card cursor-pointer hover:scale-[1.02] transition-transform">
          <div class="flex flex-col items-center gap-2 p-2">
            <UIcon name="i-heroicons-phone" class="text-3xl text-info-500" />
            <span class="font-medium text-sm">{{ t('home.sendSms') }}</span>
          </div>
        </UCard>
        <UCard class="action-card cursor-pointer hover:scale-[1.02] transition-transform">
          <div class="flex flex-col items-center gap-2 p-2">
            <UIcon name="i-heroicons-cog-6-tooth" class="text-3xl text-gray-500" />
            <span class="font-medium text-sm">{{ t('home.deviceSettings') }}</span>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Status Section -->
    <div class="mt-8">
      <UCard class="status-card">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="status-dot" :class="pageState.isEnabled ? 'status-dot--online' : 'status-dot--offline'" />
            <div>
              <p class="font-bold">{{ t('home.deviceStatus') }}</p>
              <p class="text-sm text-gray-400">
                {{ pageState.isEnabled ? t('home.statusActive') : t('home.statusInactive') }}
              </p>
            </div>
          </div>
          <span class="text-2xl">{{ pageState.isEnabled ? '🟢' : '🔴' }}</span>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-primary: #6366f1;
$color-success: #22c55e;
$color-border: rgba(99, 102, 241, 0.15);
$radius-xl: 1rem;
$transition-normal: 0.25s ease;

.activation-card {
  border: 2px solid $color-primary;
  border-radius: $radius-xl;
  transition: all $transition-normal;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__label {
    font-weight: 700;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  &--active {
    border-color: $color-success;
    box-shadow: 0 0 20px rgba($color-success, 0.3);

    .activation-card__label {
      color: $color-success;
    }
  }
}

.zone-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 1rem;
  background: rgba(22, 33, 62, 0.8);
  border: 1px solid $color-border;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all $transition-normal;
  min-width: 85px;

  &__emoji {
    font-size: 1.5rem;
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: $color-primary;
    transition: color 0.15s ease;
  }

  &__title {
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
  }

  &:hover {
    background: rgba($color-primary, 0.15);
    border-color: rgba($color-primary, 0.4);
    transform: translateY(-2px);
  }

  &--active {
    background: $color-primary;
    border-color: $color-primary;
    color: white;

    .zone-option__icon {
      color: white;
    }
  }
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;

  &--online {
    background: $color-success;
    box-shadow: 0 0 10px $color-success;

    &::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: $color-success;
      animation: pulse-ring 1.5s ease-out infinite;
      opacity: 0;
    }
  }

  &--offline {
    background: #ef4444;
    box-shadow: 0 0 10px #ef4444;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.emoji {
  font-size: 1.25em;
  line-height: 1;
}

// Swiper slide width fix
:deep(.swiper-slide) {
  width: auto !important;
}
</style>
