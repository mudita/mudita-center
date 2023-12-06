/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataInitializer } from "./metadata-initializer.service"
import { MetadataStore } from "./metadata-store.service"
import { MetadataKey } from "Core/metadata/constants"

import packageInfo from "../../../../apps/mudita-center/package.json"

const store = new MetadataStore()
const subject = new MetadataInitializer(store)

test("set initial data when `init` method is called", () => {
  expect(store.getValue(MetadataKey.MuditaCenterVersion)).toBeUndefined()

  subject.init()

  expect(store.getValue(MetadataKey.MuditaCenterVersion)).toEqual(
    packageInfo.version
  )
})
