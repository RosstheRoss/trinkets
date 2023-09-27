<script lang="ts">
  import { FileDropzone, ProgressBar } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  let disableInput = false;
  let files: FileList;
  let form: HTMLFormElement;
  let worker: Worker;

  function onUpload() {
    disableInput = true;
    worker.postMessage(files[0]);
    form.reset();
  }

  onMount(async () => {
    worker = new Worker(new URL('$lib/ts/crc32.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<number>) => {
      disableInput = false;
      console.log(e.data);
    };
  });
</script>

<svelte:head>
  <title>CRC32</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <form bind:this={form} on:submit|preventDefault={onUpload} method="POST" action="?/TODO">
      <FileDropzone
        name="checksumMe"
        bind:files
        on:change={() => form.requestSubmit()}
        required
        disabled={disableInput}
      >
        <svelte:fragment slot="lead">
          <h2 class="h2">Drop a file here to get its CRC32 checksum.</h2>
        </svelte:fragment>
      </FileDropzone>
      <br />
      <noscript>
        <button type="submit" class="btn variant-filled">
          After adding a file, click to submit! (Not yet implemented)
        </button>
      </noscript>
      {#if disableInput}
        <h3 class="h3">Calculating the checksum, this may take time!</h3> <br />
        <ProgressBar />
      {/if}
    </form>
  </div>
</div>
