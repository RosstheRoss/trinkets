<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<AppRail>
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Home!</AppRailAnchor>
  </svelte:fragment>
	<AppRailAnchor href="/truncate" selected={$page.url.pathname === '/truncate'}>Truncate!</AppRailAnchor>
</AppRail>
