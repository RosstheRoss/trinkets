<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';
  import {
    AppShell,
    AppBar,
    getDrawerStore,
    getToastStore,
    initializeStores,
    Toast,
    Drawer
  } from '@skeletonlabs/skeleton';

  import Navigation from '$lib/svelte/Navigation.svelte';

  import '../app.postcss';
  // Floating UI for Popups
  // import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  // import { storePopup } from '@skeletonlabs/skeleton';
  // storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();

  const drawerStore = getDrawerStore();
  const toastStore = getToastStore();

  function drawerOpen() {
    drawerStore.open({
      width: 'w-[80px]'
    });
  }

  onMount(async () => {
    if (pwaInfo) {
      useRegisterSW({
        immediate: true,
        onRegistered(r) {
          console.log(`SW Registered: ${r?.active?.scriptURL}`);
        },
        onRegisterError(error: Error) {
          console.error('SW registration error', error);
        },
        onOfflineReady() {
          toastStore.trigger({
            background: 'variant-filled-success',
            hideDismiss: true,
            message: 'Now ready for offline use!',
            timeout: 5000
          });
        }
      });
    }
  });

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags VitePWA can probably be trusted -->
  {@html webManifestLink}
</svelte:head>

<Drawer>
  <Navigation />
</Drawer>

<Toast position="br" />

<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 lg:w-64">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center">
          <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            <span>
              <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                <rect width="100" height="20" />
                <rect y="30" width="100" height="20" />
                <rect y="60" width="100" height="20" />
              </svg>
            </span>
          </button>
          <strong class="text-xl uppercase">A!</strong>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
