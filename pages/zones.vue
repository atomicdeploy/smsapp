<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('nav.zones')
})

interface Zone {
  id: string
  name: string
  isActive: boolean
  sensor: string
  icon: string
  emoji: string
}

const zones = ref<Zone[]>([
  { id: 'zone1', name: 'zones.zone1', isActive: true, sensor: 'zones.doorSensor', icon: 'i-heroicons-home', emoji: '🚪' },
  { id: 'zone2', name: 'zones.zone2', isActive: false, sensor: 'zones.windowSensor', icon: 'i-heroicons-window', emoji: '🪟' },
  { id: 'zone3', name: 'zones.zone3', isActive: true, sensor: 'zones.motionSensor', icon: 'i-heroicons-eye', emoji: '👁️' },
  { id: 'zone4', name: 'zones.zone4', isActive: false, sensor: 'zones.glassSensor', icon: 'i-heroicons-viewfinder-circle', emoji: '💎' },
  { id: 'zone5', name: 'zones.zone5', isActive: false, sensor: 'zones.smokeSensor', icon: 'i-heroicons-fire', emoji: '🔥' }
])

const toggleZone = (zone: Zone) => {
  zone.isActive = !zone.isActive
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <span>🎯</span>
      {{ t('zones.title') }}
    </h1>

    <div class="space-y-4">
      <UCard
        v-for="zone in zones"
        :key="zone.id"
        class="zone-card"
        :class="{ 'zone-card--active': zone.isActive }"
      >
        <div class="flex items-center gap-4">
          <div class="zone-icon" :class="{ 'zone-icon--active': zone.isActive }">
            <span class="text-2xl">{{ zone.emoji }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg">{{ t(zone.name) }}</h3>
            <p class="text-sm text-gray-400">{{ t(zone.sensor) }}</p>
          </div>
          <UToggle
            :model-value="zone.isActive"
            color="emerald"
            size="lg"
            @update:model-value="toggleZone(zone)"
          />
        </div>
      </UCard>
    </div>

    <div class="mt-8">
      <UCard>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-information-circle" class="text-2xl text-info-500" />
          <p class="text-sm text-gray-400">
            {{ t('zones.info') }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-primary: #6366f1;
$color-success: #22c55e;
$color-border: rgba(99, 102, 241, 0.15);

.zone-card {
  transition: all 0.25s ease;
  border: 1px solid $color-border;

  &:hover {
    transform: translateX(-4px);
    border-color: rgba($color-primary, 0.4);
  }

  &--active {
    border-color: rgba($color-success, 0.5);
    background: rgba($color-success, 0.05);
  }
}

.zone-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba($color-primary, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &--active {
    background: rgba($color-success, 0.15);
  }
}
</style>
