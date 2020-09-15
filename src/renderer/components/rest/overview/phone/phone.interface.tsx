export interface PhoneProps {
  batteryLevel: number
  network?: string
  onDisconnect: () => void
  onClick?: () => void
}
