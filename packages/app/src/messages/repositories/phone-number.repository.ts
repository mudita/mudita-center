/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { PhoneNumberModel } from "App/messages/models"
import { PhoneNumber } from "App/messages/dto"

export class PhoneNumberRepository implements Repository {
  constructor(private phoneNumberModel: PhoneNumberModel) {}

  public create(
    phoneNumber: PhoneNumber,
    skipCallbacks = false
  ): PhoneNumber | undefined {
    return this.phoneNumberModel.create(phoneNumber, skipCallbacks)
  }

  public update(
    phoneNumber: PhoneNumber,
    skipCallbacks = false
  ): PhoneNumber | undefined {
    return this.phoneNumberModel.update(phoneNumber, skipCallbacks)
  }

  public delete(id: PhoneNumber["id"], skipCallbacks = false): void {
    this.phoneNumberModel.delete(id, skipCallbacks)
  }
}
