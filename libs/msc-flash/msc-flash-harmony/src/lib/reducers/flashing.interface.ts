/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FlashingProcessState } from "../constants"
import { MscFlashDetails } from "../dto"

export interface FlashingState {
  abortController?: AbortController
  processState: FlashingProcessState
  mscFlashDetails?: MscFlashDetails
  error: string | undefined
}
