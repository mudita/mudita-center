/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  entitiesJsonDataValidator,
  entitiesFileDataValidator,
} from "./entities-data-get.validator"

describe("entitiesJsonDataValidator", () => {
  it("validates a correct JSON data structure", () => {
    const validJsonData = { data: [{ id: "1", name: "Entity1", 3: "value" }] }
    expect(() => entitiesJsonDataValidator.parse(validJsonData)).not.toThrow()
  })

  it("validates a correct JSON data with empty data array", () => {
    const invalidJsonData = { data: [] }
    expect(() => entitiesJsonDataValidator.parse(invalidJsonData)).not.toThrow()
  })

  it("fails validation for JSON data with non-array data field", () => {
    const invalidJsonData = { data: { id: "1", name: "Entity1" } }
    expect(() => entitiesJsonDataValidator.parse(invalidJsonData)).toThrow()
  })
})

describe("entitiesFileDataValidator", () => {
  it("validates a correct file data structure", () => {
    const validFileData = { filePath: "/path/to/file" }
    expect(() => entitiesFileDataValidator.parse(validFileData)).not.toThrow()
  })

  it("fails validation for file data with empty filePath", () => {
    const invalidFileData = { filePath: "" }
    expect(() => entitiesFileDataValidator.parse(invalidFileData)).toThrow()
  })

  it("fails validation for file data with non-string filePath", () => {
    const invalidFileData = { filePath: 123 }
    expect(() => entitiesFileDataValidator.parse(invalidFileData)).toThrow()
  })
})
