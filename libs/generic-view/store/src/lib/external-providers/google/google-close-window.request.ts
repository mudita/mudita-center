/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Core/__deprecated__/common/enums/google-auth-actions.enum"

export const googleCloseWindowRequest = async (): Promise<
  ResultObject<undefined>
> => {
  return await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
}
