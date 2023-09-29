<script lang="ts">
  import Navigation from '$lib/svelte/Navigation.svelte'
  import Icon from '@iconify/svelte'
  import menuIcon from '@iconify/icons-carbon/menu'
  import {
    AppBar,
    AppShell,
    Drawer,
    Toast,
    getDrawerStore,
    initializeStores,
  } from '@skeletonlabs/skeleton'
  import { pwaInfo } from 'virtual:pwa-info'
  import '../app.postcss'

  // Floating UI for Popups
  // import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  // import { storePopup } from '@skeletonlabs/skeleton';
  // storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores()

  const drawerStore = getDrawerStore()

  function drawerOpen() {
    drawerStore.open({
      width: 'w-[80px]',
    })
  }

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags VitePWA can probably be trusted -->
  {@html webManifestLink}
</svelte:head>

<Drawer>
  <Navigation menu />
</Drawer>

<Toast position="br" />

<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 md:w-20">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <div class="flex items-center">
          <button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            <Icon icon={menuIcon} width="25" />
          </button>
          <strong class="text-xl uppercase">Nothing</strong>
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

{#await import('$lib/svelte/ReloadPrompt.svelte') then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}
