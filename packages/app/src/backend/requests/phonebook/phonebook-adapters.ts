/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import DeviceService from "Backend/device-service"
import PureDeviceManager from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"

export const getAdapters = () =>
  (({
    phonebook: createPhonebook(new DeviceService(PureDeviceManager, ipcMain)),
  } as unknown) as Adapters)
