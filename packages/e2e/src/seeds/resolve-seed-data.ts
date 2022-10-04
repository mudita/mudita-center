/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contactsListSeed } from "../specs/contacts/seeds/contacts-list.seed"
import { TestFilesPaths } from "../test-filenames"

export const resolveSeedData = (specFileName: string) => {
  // specFileName contains the absolute path (e.g. /User/someproject/src/specs/contacts/contacts-list.e2e.ts)
  // that is why "includes" is used
  if (specFileName.includes(TestFilesPaths.contactsListTest)) {
    return contactsListSeed
  }
}
