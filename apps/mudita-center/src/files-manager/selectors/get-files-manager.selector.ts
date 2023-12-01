/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { FilesManagerState } from "App/files-manager/reducers/files-manager.interface"

export const getFilesManager = (state: ReduxRootState): FilesManagerState => {
  return state.filesManager
}
