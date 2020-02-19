type DownloadInfo = Readonly<{
  // Path where file is stored
  directory: string
  // Amount of downloaded data
  progress: {
    percent: number
    transferredBytes: number
    totalBytes: number
  }
}>

export default DownloadInfo
