<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';

  import '../app.postcss';
  import { AppShell, AppBar, getToastStore, initializeStores, Toast } from '@skeletonlabs/skeleton';
  import Navigation from '$lib/svelte/Navigation.svelte';

  // Floating UI for Popups
  // import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  // import { storePopup } from '@skeletonlabs/skeleton';
  // storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();

  const toastStore = getToastStore();

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

<Toast position="br" />

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
          <strong class="text-xl uppercase">A!</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a
          class="btn btn-sm variant-ghost-surface"
          href="https://github.com/rosstheross/rosstheross.github.io"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Source
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
