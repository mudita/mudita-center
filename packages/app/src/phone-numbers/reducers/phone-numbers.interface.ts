/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { PhoneNumber } from "App/phone-numbers/dto"

export type PhoneNumberMap = { [id: string]: PhoneNumber }

export type PhoneNumbersState = Readonly<{
  numbers: PhoneNumberMap
}>
