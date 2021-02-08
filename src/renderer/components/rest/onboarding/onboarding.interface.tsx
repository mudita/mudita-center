/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
