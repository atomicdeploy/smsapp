<template>
  <div>
    <NuxtLoadingIndicator color="#6366f1" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const colorMode = useColorMode()

// Set document direction based on locale
const updateDirection = () => {
  const dir = locale.value === 'fa' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = locale.value
}

// Watch for locale changes
watch(locale, updateDirection, { immediate: true })

// Apply color mode class
watch(
  () => colorMode.value,
  (mode) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(mode)
  },
  { immediate: true }
)

// SEO
useHead({
  titleTemplate: (title) => title ? `${title} | سامانه ضد سرقت` : 'سامانه ضد سرقت'
})
</script>
