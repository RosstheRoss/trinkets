<script lang="ts">
  import { page } from '$app/stores'
  import { base } from '$app/paths'

  import 'iconify-icon'

  import { AppRail, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton'

  const drawerStore = getDrawerStore()

  function drawerClose(): void {
    drawerStore.close()
  }

  /**
   * If the menu prop is true, then the close menu button will be rendered.
   */
  export let menu = false
</script>

<AppRail>
  <svelte:fragment slot="lead">
    {#if menu}
      <AppRailAnchor on:click={drawerClose} title="Close Menu" value={0} href="javascript:;">
        <svelte:fragment slot="lead">
          <iconify-icon icon="carbon:menu" width="25"></iconify-icon>
        </svelte:fragment>
        Close Menu
      </AppRailAnchor>
    {/if}
  </svelte:fragment>
  <AppRailAnchor
    href={base}
    selected={$page.url.pathname === base}
    on:click={drawerClose}
    title="Homepage"
  >
    <svelte:fragment slot="lead">
      <iconify-icon icon="carbon:home" width="35"></iconify-icon>
    </svelte:fragment>
    Home!
  </AppRailAnchor>
  <AppRailAnchor
    href="{base}/truncate"
    selected={$page.url.pathname === base + '/truncate'}
    on:click={drawerClose}
    title="Truncate Files"
  >
    <svelte:fragment slot="lead">
      <iconify-icon icon="carbon:page-break" width="35"></iconify-icon>
    </svelte:fragment>
    Truncate!
  </AppRailAnchor>
  <svelte:fragment slot="trail">
    <AppRailAnchor
      href="https://github.com/rosstheross/random-stuff"
      rel="noreferrer"
      on:click={drawerClose}
      title="Source Code"
    >
      <svelte:fragment slot="lead">
        <iconify-icon icon="carbon:logo-github" width="35"></iconify-icon>
      </svelte:fragment>
      Source!
    </AppRailAnchor>
  </svelte:fragment>
</AppRail>
