export interface FilesManagerProps {
  onFilesOpen: () => void
  usedSpace: number
  maxSpace?: number
  unit?: "B" | "KB" | "MB" | "GB"
}
