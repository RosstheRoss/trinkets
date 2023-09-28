<script lang="ts">
  import Icon from '@iconify/svelte';
  import { AppRail, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';

  const drawerStore = getDrawerStore();

  function drawerClose(): void {
    drawerStore.close();
  }
</script>

<AppRail data-sveltekit-reload>
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/" selected={$page.url.pathname === '/'} on:click={drawerClose}>
      <svelte:fragment slot="lead">
        <Icon icon="carbon:home" width="35" />
      </svelte:fragment>
      Home!
    </AppRailAnchor>
  </svelte:fragment>
  <AppRailAnchor
    href="/truncate"
    selected={$page.url.pathname === '/truncate'}
    data-sveltekit-reload
    on:click={drawerClose}
  >
    <svelte:fragment slot="lead">
      <Icon icon="carbon:page-break" width="35" />
    </svelte:fragment>
    Truncate!
  </AppRailAnchor>
  <svelte:fragment slot="trail">
    <AppRailAnchor
      href="https://github.com/rosstheross/rosstheross.github.io"
      rel="noreferrer"
      target="_blank"
    >
      <svelte:fragment slot="lead">
        <Icon icon="carbon:logo-github" width="35" />
      </svelte:fragment>
      Source
    </AppRailAnchor>
  </svelte:fragment>
</AppRail>
