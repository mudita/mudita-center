/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { entitiesMetadataValidator } from "./entities-metadata.validator"

describe("entitiesMetadataValidator", () => {
  it("validates metadata with a nonnegative totalEntities", () => {
    const validMetadata = { totalEntities: 10 }
    expect(() => entitiesMetadataValidator.parse(validMetadata)).not.toThrow()
  })

  it("fails validation for negative totalEntities", () => {
    const invalidMetadata = { totalEntities: -1 }
    expect(() => entitiesMetadataValidator.parse(invalidMetadata)).toThrow()
  })

  it("fails validation for missing totalEntities", () => {
    const invalidMetadata = {}
    expect(() => entitiesMetadataValidator.parse(invalidMetadata)).toThrow()
  })

  it("fails validation for non-numeric totalEntities", () => {
    const invalidMetadata = { totalEntities: "ten" }
    expect(() => entitiesMetadataValidator.parse(invalidMetadata)).toThrow()
  })
})
