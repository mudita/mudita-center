/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Faker from "faker"
import { Contact } from "App/contacts/store/contacts.type"

export const createFakeContact = (): Contact => ({
  id: Faker.datatype.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  primaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
  secondaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})
