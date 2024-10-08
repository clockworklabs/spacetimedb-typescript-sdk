export async function decompressGzip(buffer: Uint8Array): Promise<Uint8Array> {
  // GZIP
  // Convert Uint8Array to a ReadableStream
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(buffer);
      controller.close();
    },
  });

  // Create a DecompressionStream
  const decompressionStream = new DecompressionStream('gzip');

  // Pipe the ReadableStream through the DecompressionStream
  const decompressedStream = readableStream.pipeThrough(decompressionStream);

  // Collect the decompressed chunks efficiently
  const reader = decompressedStream.getReader();
  const chunks: any[] = [];
  let totalLength = 0;
  let result: any;

  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
    totalLength += result.value.length;
  }

  // Allocate a single Uint8Array for the decompressed data
  const decompressedArray = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    decompressedArray.set(chunk, offset);
    offset += chunk.length;
  }

  return decompressedArray;
}
