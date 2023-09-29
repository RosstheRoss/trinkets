<script lang="ts">
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const toastStore = getToastStore()

  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(r) {
      console.log('SW Registered: ', r)
    },
    onNeedRefresh() {
      toastStore.trigger({
        message: 'A new version of the application is available.',
        autohide: false,
        action: {
          label: 'Refresh',
          response: updateServiceWorker,
        },
      })
    },
    onOfflineReady() {
      toastStore.trigger({
        background: 'variant-filled-success',
        message: 'Now ready for offline use!',
        timeout: 5000,
      })
    },
    onRegisterError(err) {
      console.error('SW Registration Error: ', err)
    },
  })
</script>
