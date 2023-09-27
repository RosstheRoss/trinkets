export type TruncateRequest = {
	file: File,
	size: number,
};

export type TruncateResponse = {
	file: ArrayBuffer,
};
