/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { OutlookAuthActions } from "Core/__deprecated__/common/enums/outlook-auth-actions.enum"

export const outlookCloseWindowRequest = async (): Promise<
  ResultObject<undefined>
> => {
  return await ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
}
