/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import helpStore from "App/__deprecated__/main/store/help"

export const registerSetHelpStoreHandler = (): (() => void) =>
  ipcMain.answerRenderer(HelpActions.SetStoreValue, (response) => {
    return helpStore.set("data", response)
  })

export const removeSetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.SetStoreValue)
