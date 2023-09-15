import crc32 from 'crc/crc32';

onmessage = async (message: MessageEvent<File>) => {
  const file = message.data;
  const buffer = await file.arrayBuffer();
  const crc = crc32(buffer, 517762881);
  postMessage(crc);
};
