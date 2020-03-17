export interface SystemProps {
  osVersion: string
  lastUpdate?: string
  onUpdateCheck?: () => void
  onUpdate?: () => void
  onDownload?: () => void
  updateAvailable?: boolean
  updateDownloaded?: boolean
}
