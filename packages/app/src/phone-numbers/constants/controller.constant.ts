/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "phone-numbers"

export enum IpcPhoneNumbersEvent {
  GetPhoneNumber = "get-phone-number",
}

export enum IpcPhoneNumbersRequest {
  GetPhoneNumber = "phone-numbers-get-phone-number",
}
