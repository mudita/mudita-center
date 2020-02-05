export interface SystemProps {
  osVersion: string
  lastUpdate?: string
  onUpdateCheck?: () => void
  onUpdate?: () => void
  updateAvailable?: boolean
}
