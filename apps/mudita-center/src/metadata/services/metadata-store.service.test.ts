/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataStore } from "./metadata-store.service"
import { MetadataKey } from "App/metadata/constants"

const subject = new MetadataStore()

beforeEach(() => {
  Object.values(MetadataKey).forEach((key) => {
    subject.setValue(key, null)
  })
})

describe("Method: setValue", () => {
  test("set value to provided key", () => {
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toBeNull()

    subject.setValue(MetadataKey.MuditaCenterVersion, "1.0.0")

    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toEqual("1.0.0")
  })

  test("convert number value to string", () => {
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toBeNull()

    subject.setValue(MetadataKey.MuditaCenterVersion, 100)

    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toEqual("100")
  })

  test("nulled the key if `null` value is provided", () => {
    subject.setValue(MetadataKey.MuditaCenterVersion, "1.0.0")
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toEqual("1.0.0")

    subject.setValue(MetadataKey.MuditaCenterVersion, null)
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toBeNull()
  })
})

describe("Method: getValue", () => {
  test("returns value of the provided key", () => {
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toBeNull()

    subject.setValue(MetadataKey.MuditaCenterVersion, 100)
    expect(subject.getValue(MetadataKey.MuditaCenterVersion)).toEqual("100")
  })
})

describe("Getter: metadata", () => {
  test("return whore key store", () => {
    Object.values(MetadataKey).forEach((key) => {
      expect(subject.metadata.has(key)).toEqual(true)
    })
  })
})
