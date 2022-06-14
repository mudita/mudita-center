/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UpdatingTemplateModalsProps {
  error: Error | string | null
  updating: boolean
  updatingInfo: boolean
  onCloseUpdatingErrorModal: () => void
}
