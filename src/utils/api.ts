export const streamToString = async (stream: ReadableStream<Uint8Array>) => {
  const reader = stream.getReader()

  const chunks = []
   while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break
    }
    chunks.push(value)
  }

  return Buffer.concat(chunks).toString("utf8")
}
