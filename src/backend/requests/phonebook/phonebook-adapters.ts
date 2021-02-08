/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import MockPureNodeService from "Backend/mock-device-service"
import PureDeviceManager from "pure"
import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"

export const adapters = ({
  phonebook: createPhonebook(
    new MockPureNodeService(PureDeviceManager, ipcMain)
  ),
} as unknown) as Adapters
