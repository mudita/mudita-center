/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataStoreDoesntInitializedError } from "./metadata-store-doesnt-initialized.error"
import { MetadataError } from "App/metadata/constants"

const subject = new MetadataStoreDoesntInitializedError("Subject error", {
  error: "Error description",
})

test("MetadataStoreDoesntInitializedError have MetadataError.MetadataStoreDoesntInitialized type", () => {
  expect(subject.type).toEqual(MetadataError.MetadataStoreDoesntInitialized)
})

test("MetadataStoreDoesntInitializedError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("MetadataStoreDoesntInitializedError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
