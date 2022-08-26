/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { faker } from "@faker-js/faker"
import { Contact } from "App/contacts/reducers/contacts.interface"

export const createFakeContact = (): Contact => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  primaryPhoneNumber: faker.phone.phoneNumber("+## ### ### ###"),
  secondaryPhoneNumber: faker.phone.phoneNumber("+## ### ### ###"),
})
