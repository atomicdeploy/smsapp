<template>
  <div class="app-layout">
    <TheHeader />
    <main class="page-content">
      <slot />
    </main>
    <NavMenu />
  </div>
</template>

<script setup lang="ts">
// Layout component - includes header and navigation
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding-bottom: 100px; // Space for bottom nav
}
</style>
