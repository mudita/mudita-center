/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Faker from "faker"

export const makeNewNote = (
  id: string = Faker.random.uuid(),
  content = ""
) => ({
  id,
  content,
  date: new Date(Date.now()),
})
