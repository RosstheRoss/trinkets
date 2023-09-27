// TODO: Think about using a WebAssembly implementation of CRC32 instead of JavaScript.
// WHY? The JavaScript implementation is not very extensible and is not very fast.
import crc32 from 'crc/crc32';

onmessage = async (message: MessageEvent<File>) => {
  const file = message.data;
  const buffer = await file.arrayBuffer();
  const crc = crc32(buffer);
  postMessage(crc);
};
