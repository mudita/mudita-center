/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const getFilesManager = (state: ReduxRootState) => {
  return state.filesManager
}
