export interface SystemProps {
  osVersion: string
  lastUpdate?: string
  onUpdatesCheck?: () => void
  updateAvailable?: boolean
}
