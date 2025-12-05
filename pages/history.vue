<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('nav.history')
})

interface HistoryItem {
  id: number
  event: string
  zone: string
  time: string
  type: 'alarm' | 'status' | 'command'
  emoji: string
}

const history = ref<HistoryItem[]>([
  { id: 1, event: 'history.systemActivated', zone: '-', time: '۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰', type: 'status', emoji: '✅' },
  { id: 2, event: 'history.zoneTriggered', zone: 'zones.zone1', time: '۱۴۰۳/۰۹/۱۵ - ۱۲:۱۵', type: 'alarm', emoji: '🚨' },
  { id: 3, event: 'history.smsSent', zone: '-', time: '۱۴۰۳/۰۹/۱۵ - ۱۲:۱۶', type: 'command', emoji: '📱' },
  { id: 4, event: 'history.systemDeactivated', zone: '-', time: '۱۴۰۳/۰۹/۱۴ - ۲۲:۰۰', type: 'status', emoji: '⚪' },
  { id: 5, event: 'history.zoneTriggered', zone: 'zones.zone3', time: '۱۴۰۳/۰۹/۱۴ - ۱۸:۴۵', type: 'alarm', emoji: '🚨' }
])

const getTypeColor = (type: HistoryItem['type']) => {
  switch (type) {
    case 'alarm':
      return 'red'
    case 'status':
      return 'emerald'
    case 'command':
      return 'blue'
    default:
      return 'gray'
  }
}

const getTypeIcon = (type: HistoryItem['type']) => {
  switch (type) {
    case 'alarm':
      return 'i-heroicons-bell-alert'
    case 'status':
      return 'i-heroicons-check-circle'
    case 'command':
      return 'i-heroicons-paper-airplane'
    default:
      return 'i-heroicons-information-circle'
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <span>📜</span>
      {{ t('history.title') }}
    </h1>

    <div class="space-y-3">
      <UCard
        v-for="item in history"
        :key="item.id"
        class="history-item"
      >
        <div class="flex items-start gap-4">
          <div class="history-icon">
            <span class="text-xl">{{ item.emoji }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <UBadge :color="getTypeColor(item.type)" size="xs">
                <UIcon :name="getTypeIcon(item.type)" class="me-1" />
                {{ t(`history.types.${item.type}`) }}
              </UBadge>
            </div>
            <h3 class="font-medium">{{ t(item.event) }}</h3>
            <p v-if="item.zone !== '-'" class="text-sm text-gray-400">
              {{ t('history.zone') }}: {{ t(item.zone) }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              <UIcon name="i-heroicons-clock" class="inline-block me-1" />
              {{ item.time }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <div v-if="history.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-inbox" class="text-5xl text-gray-500 mb-4" />
      <p class="text-gray-400">{{ t('history.empty') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-primary: #6366f1;
$color-border: rgba(99, 102, 241, 0.15);

.history-item {
  transition: all 0.25s ease;
  border: 1px solid $color-border;

  &:hover {
    transform: translateX(-4px);
    border-color: rgba($color-primary, 0.4);
  }
}

.history-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba($color-primary, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
