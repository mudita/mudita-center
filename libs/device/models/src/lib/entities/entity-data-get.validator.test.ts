/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { entityJsonDataValidator } from "./entity-data-get.validator"

describe("entityJsonDataValidator", () => {
  it("validates a correct JSON data structure", () => {
    const validJsonData = { data: { key1: "value1", key2: 123, 3: "value2" } }
    expect(() => entityJsonDataValidator.parse(validJsonData)).not.toThrow()
  })

  it("fails validation for JSON data with non-object data field", () => {
    const invalidJsonData = { data: "invalid data" }
    expect(() => entityJsonDataValidator.parse(invalidJsonData)).toThrow()
  })

  it("fails validation for JSON data with array data field", () => {
    const invalidJsonData = { data: [] }
    expect(() => entityJsonDataValidator.parse(invalidJsonData)).toThrow()
  })
})
