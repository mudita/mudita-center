/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import helpStore from "App/main/store/help"
import { merge } from "lodash"

export const registerSetHelpStoreHandler = (): (() => void) =>
  ipcMain.answerRenderer(HelpActions.SetStoreValue, (response) => {
    const oldData = helpStore.get("data")
    const newData = merge(oldData, response)
    return helpStore.set("data", newData)
  })

export const removeSetHelpStoreHandler = () =>
  ipcMain.removeHandler(HelpActions.SetStoreValue)
