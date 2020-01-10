export const convertBytes = (bytes: number): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"]

  if (bytes === 0) {
    return "n/a"
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  if (i === 0) {
    return bytes + " " + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}
