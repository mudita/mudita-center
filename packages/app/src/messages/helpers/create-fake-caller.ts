/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"
import Faker from "faker"

export const createFakeCaller = (): Caller => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
  secondaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})
