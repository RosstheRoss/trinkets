import type { TruncateRequest, TruncateResponse } from '../types/truncate-worker';


onmessage = async (message: MessageEvent<TruncateRequest>) => {
	const file = message.data.file;
	const buffer = await file.arrayBuffer();
	const truncated = buffer.slice(0, message.data.size);

	postMessage({ file: truncated } as TruncateResponse);
}