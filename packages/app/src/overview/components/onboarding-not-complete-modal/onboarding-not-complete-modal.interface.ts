/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalDialogProps } from "App/ui"

export interface OnboardingNotCompleteModalProps extends ModalDialogProps {
  open: boolean
  onClose: () => void
  testId?: string
}
