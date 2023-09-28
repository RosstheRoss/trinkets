// Yoinked from https://web.dev/patterns/files/save-a-file/ for the polyfill

export default async function saveFile(blob: ArrayBuffer, suggestedName: string | undefined) {
  const supportsFSAccess =
    'showSaveFilePicker' in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();

  if (supportsFSAccess) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: suggestedName
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err: unknown) {
      // TypeScript
      if ((err as Error)?.name !== 'AbortError') {
        return Promise.reject(err);
      }
    }
  } else {
    const anchor = document.createElement('a');
    anchor.download = suggestedName ?? 'truncated';
    anchor.href = URL.createObjectURL(new Blob([blob]));
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }
}
