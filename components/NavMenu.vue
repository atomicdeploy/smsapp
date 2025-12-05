<script setup lang="ts">
const { t } = useI18n()

interface MenuItem {
  label: string
  icon: string
  to: string
}

const menuItems = computed<MenuItem[]>(() => [
  {
    label: t('nav.home'),
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: t('nav.zones'),
    icon: 'i-heroicons-squares-2x2',
    to: '/zones'
  },
  {
    label: t('nav.history'),
    icon: 'i-heroicons-clock',
    to: '/history'
  },
  {
    label: t('nav.settings'),
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings'
  }
])
</script>

<template>
  <nav class="menu">
    <NuxtLink
      v-for="menuItem in menuItems"
      :key="menuItem.to"
      :to="menuItem.to"
      class="menu-item"
    >
      <UIcon :name="menuItem.icon" class="icon" />
      <span>{{ menuItem.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
$color-primary: #6366f1;
$color-text-muted: #64748b;
$color-border: rgba(99, 102, 241, 0.15);

.menu {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 80px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid $color-border;
  z-index: 40;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: $color-text-muted;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.25s ease;
  min-width: 64px;
  position: relative;

  .icon {
    font-size: 1.5rem;
    transition: transform 0.15s ease;
  }

  span {
    font-size: 0.7rem;
    font-weight: 500;
  }

  &:hover {
    color: #94a3b8;
    background: rgba($color-primary, 0.1);
  }

  &.router-link-active {
    color: $color-primary;

    .icon {
      transform: scale(1.1);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 4px;
      height: 4px;
      background: $color-primary;
      border-radius: 9999px;
    }
  }
}

.light .menu {
  background: rgba(255, 255, 255, 0.95);
  border-top-color: rgba(148, 163, 184, 0.2);
}
</style>
