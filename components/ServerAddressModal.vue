<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const settingStore = useSettingsStore()

const isModalOpen = ref(false)
const serverNameInput = ref('')

defineExpose({
  isModalOpen
})

// Initialize input when modal opens
watch(isModalOpen, (value) => {
  if (value) {
    serverNameInput.value = settingStore.serverAddress || ''
  }
})

const saveServerAddress = () => {
  if (!serverNameInput.value.trim()) {
    toast.add({
      title: t('errors.emptyDeviceAddress'),
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
    return
  }

  settingStore.setServerAddress(serverNameInput.value.trim())

  toast.add({
    title: t('success.addressSaved'),
    icon: 'i-heroicons-check-badge',
    color: 'emerald'
  })

  isModalOpen.value = false
}

const cancel = () => {
  isModalOpen.value = false
}
</script>

<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <div class="modal__header">
          {{ t('settings.deviceAddressTitle') }}
        </div>
      </template>

      <div class="modal__body">
        <UFormGroup :label="t('settings.deviceAddress')" name="server_name">
          <UInput
            v-model="serverNameInput"
            dir="ltr"
            type="text"
            size="xl"
            :placeholder="t('settings.deviceAddressPlaceholder')"
            class="input-ltr"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="modal__footer">
          <UButton color="gray" variant="soft" @click="cancel">
            {{ t('common.cancel') }}
          </UButton>
          <UButton color="primary" @click="saveServerAddress">
            {{ t('common.confirm') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style lang="scss" scoped>
.modal {
  &__header {
    font-weight: 700;
    font-size: 1.125rem;
  }

  &__body {
    padding: 1rem 0;
  }

  &__footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}

.input-ltr {
  text-align: left;
  direction: ltr;
}
</style>
