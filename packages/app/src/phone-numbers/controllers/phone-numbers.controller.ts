/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { PhoneNumberService } from "App/phone-numbers/services"
import { PhoneNumber } from "App/phone-numbers/dto"
import {
  ControllerPrefix,
  IpcPhoneNumbersEvent,
} from "App/phone-numbers/constants"
import { ResultObject } from "App/core/builder"

@Controller(ControllerPrefix)
export class PhoneNumbersController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @IpcEvent(IpcPhoneNumbersEvent.GetPhoneNumber)
  public createContact(
    id: string
  ): Promise<ResultObject<PhoneNumber> | undefined> {
    return this.phoneNumberService.getPhoneNumber(id)
  }
}
