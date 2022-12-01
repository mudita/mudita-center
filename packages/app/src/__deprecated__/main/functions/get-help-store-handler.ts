/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import helpStore from "App/__deprecated__/main/store/help"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const registerGetHelpStoreHandler = () =>
  ipcMain.answerRenderer(HelpActions.GetStore, () => {
    return helpStore.get("data")
  })

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeGetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.GetStore)
