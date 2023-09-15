<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<AppRail>
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Home!</AppRailAnchor>
  </svelte:fragment>
	<AppRailAnchor href="/crc32" selected={$page.url.pathname === '/crc32'}>CRC32</AppRailAnchor>
</AppRail>
