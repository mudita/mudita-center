/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { faker } from "@faker-js/faker"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeNewNote = (
  id: string = faker.datatype.uuid(),
  content = ""
) => ({
  id,
  content,
  date: new Date(Date.now()),
})
