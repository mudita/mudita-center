/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcPhoneNumbersRequest } from "App/phone-numbers/constants"
import { PhoneNumber } from "App/phone-numbers/dto"

export const getPhoneNumberRequest = async (
  id: string
): Promise<ResultObject<PhoneNumber>> => {
  return ipcRenderer.callMain(IpcPhoneNumbersRequest.GetPhoneNumber, id)
}
