/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import rmdir, { RmdirProps } from "App/main/utils/rmdir"

export enum RmdirEvents {
  Rmdir = "rmdir",
}

const registerRmdirListener = (): void => {
  ipcMain.answerRenderer<RmdirProps, boolean>(RmdirEvents.Rmdir, rmdir)
}

export default registerRmdirListener
