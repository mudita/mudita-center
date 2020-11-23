export interface OnboardingWelcomeProps {
  onContinue?: () => void
  onAutostartChange?: (autostartEnabled?: boolean) => void
  autostartEnabled?: boolean
}

export interface OnboardingConnectingProps {
  onCancel?: () => void
}

export interface OnboardingTroubleshootingProps {
  onRetry?: () => void
  onContact?: () => void
}
