<script lang="ts">
  import { page } from '$app/stores'

  import Icon from '@iconify/svelte'
  import homeIcon from '@iconify/icons-carbon/home'
  import logoGithub from '@iconify/icons-carbon/logo-github'
  import menuIcon from '@iconify/icons-carbon/menu'
  import pageBreak from '@iconify/icons-carbon/page-break'

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
      <AppRailAnchor on:click={drawerClose} title="Close Menu" value={0}>
        <svelte:fragment slot="lead">
          <Icon icon={menuIcon} width="25" />
        </svelte:fragment>
        Close Menu
      </AppRailAnchor>
    {/if}
  </svelte:fragment>
  <AppRailAnchor
    href="/"
    selected={$page.url.pathname === '/'}
    on:click={drawerClose}
    title="Homepage"
  >
    <svelte:fragment slot="lead">
      <Icon icon={homeIcon} width="35" />
    </svelte:fragment>
    Home!
  </AppRailAnchor>
  <AppRailAnchor
    href="/truncate"
    selected={$page.url.pathname === '/truncate'}
    on:click={drawerClose}
    title="Truncate Files"
  >
    <svelte:fragment slot="lead">
      <Icon icon={pageBreak} width="35" />
    </svelte:fragment>
    Truncate!
  </AppRailAnchor>
  <svelte:fragment slot="trail">
    <AppRailAnchor
      href="https://github.com/rosstheross/rosstheross.github.io"
      rel="noreferrer"
      on:click={drawerClose}
      title="Source Code"
    >
      <svelte:fragment slot="lead">
        <Icon icon={logoGithub} width="35" />
      </svelte:fragment>
      Source!
    </AppRailAnchor>
  </svelte:fragment>
</AppRail>
