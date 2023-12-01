/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface CreatingTemplateModalsProps {
  error: Error | string | null
  creating: boolean
  creatingInfo: boolean
  onCloseCreatingErrorModal: () => void
}
