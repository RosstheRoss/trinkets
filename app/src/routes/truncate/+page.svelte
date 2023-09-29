<script lang="ts">
  import saveFile from '$lib/ts/download';
  import type { TruncateRequest, TruncateResponse } from '$lib/types/truncate-worker';
  import Icon from '@iconify/svelte';
  import fileStorage from '@iconify/icons-carbon/file-storage';
  import { FileDropzone, ProgressBar } from '@skeletonlabs/skeleton';
  import { onDestroy, onMount } from 'svelte';

  let disableInput = false;
  let files: FileList;
  let form: HTMLFormElement;
  let worker: Worker;
  $: truncateTo = 1;
  let originalName: string;

  function onUpload() {
    disableInput = true;
    originalName = files[0].name;
    worker.postMessage({
      file: files[0],
      size: truncateTo
    } as TruncateRequest);
  }

  onMount(async () => {
    worker = new Worker(new URL('$lib/ts/truncate.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = async (e: MessageEvent<TruncateResponse>) => {
      await saveFile(e.data.file, `trunc-${originalName}`).catch((e) => console.error(e));
      disableInput = false;
      form.reset();
      truncateTo = 1;
    };
  });

  onDestroy(() => {
    worker.terminate()
  })
</script>

<svelte:head>
  <title>Truncate</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <form bind:this={form} on:submit|preventDefault={onUpload} method="POST" action="?/TODO">
      <noscript>
        <h3 class="h3">You need JavaScript to use this page, for now ;)</h3>
        <br />
      </noscript>
      <label class="label" for="truncateMe">
        <div class="space-y-4 w-full">
          <FileDropzone
            id="truncateMe"
            name="truncateMe"
            bind:files
            on:change={() => form.requestSubmit()}
            required
            disabled={disableInput}
          >
            <svelte:fragment slot="lead">
              <div class="flex justify-center items-center">
                <Icon icon={fileStorage}  width="50" />
              </div>
            </svelte:fragment>
            <svelte:fragment slot="meta">Drop a file here to truncate it.</svelte:fragment>
          </FileDropzone>
        </div>
      </label>
      <br />
      <label class="label">
        <span>Truncate up to... (in bytes)</span>
        <input
          class="input"
          type="number"
          name="truncateTo"
          bind:value={truncateTo}
          min="1"
          required
        />
      </label>
      <br />
      <noscript>
        <br />
        <button type="submit" class="btn variant-filled" disabled>
          After adding a file, click to submit! (Not yet implemented)
        </button>
      </noscript>
      {#if disableInput}
        <h3 class="h3">Truncating the file, this may take time!</h3>
        <br />
        <ProgressBar />
      {/if}
    </form>
  </div>
</div>
