export interface PhoneProps {
  batteryLevel: number
  network?: string
  networkLevel?: number
  onDisconnect: () => void
  onClick?: () => void
}
