export interface OnboardingWelcomeProps {
  onContinue?: () => void
  setAutostartOption?: (autostartEnabled?: boolean) => void
}

export interface OnboardingConnectingProps {
  onCancel?: () => void
}

export interface OnboardingTroubleshootingProps {
  onRetry?: () => void
}
