/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedParams } from "../../../seeds/types"

export const contactsListSeed: SeedParams = {
  contacts: [
    {
      firstName: "John",
      lastName: "Kowalski",
      primaryPhoneNumber: "555666777",
      secondaryPhoneNumber: "88899900",
    },
    {
      firstName: "Adam",
      lastName: "Nowak",
      primaryPhoneNumber: "111222333",
      secondaryPhoneNumber: "444555666",
    },
  ],
}
