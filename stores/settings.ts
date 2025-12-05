export const useSettingsStore = defineStore('settings', () => {
  const serverAddress = ref<string | null>(null)
  const deviceName = ref<string>('')
  const notificationsEnabled = ref<boolean>(true)

  // Load from localStorage on init (client-side only)
  const loadFromStorage = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('smsapp-settings')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          serverAddress.value = data.serverAddress || null
          deviceName.value = data.deviceName || ''
          notificationsEnabled.value = data.notificationsEnabled ?? true
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('smsapp-settings', JSON.stringify({
        serverAddress: serverAddress.value,
        deviceName: deviceName.value,
        notificationsEnabled: notificationsEnabled.value
      }))
    }
  }

  const setServerAddress = (address: string) => {
    serverAddress.value = address
    saveToStorage()
  }

  const setDeviceName = (name: string) => {
    deviceName.value = name
    saveToStorage()
  }

  const toggleNotifications = () => {
    notificationsEnabled.value = !notificationsEnabled.value
    saveToStorage()
  }

  const reset = () => {
    serverAddress.value = null
    deviceName.value = ''
    notificationsEnabled.value = true
    if (import.meta.client) {
      localStorage.removeItem('smsapp-settings')
    }
  }

  // Load data on store creation
  loadFromStorage()

  return {
    // State
    serverAddress,
    deviceName,
    notificationsEnabled,
    // Actions
    setServerAddress,
    setDeviceName,
    toggleNotifications,
    reset,
    loadFromStorage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
