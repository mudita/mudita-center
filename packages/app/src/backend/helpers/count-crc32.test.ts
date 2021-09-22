/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import countCRC32 from "Backend/helpers/count-crc32"
import path from "path"
import * as fs from "fs"

const hexadecimal = /^[a-f0-9]/i

describe("countCRC32 helper", () => {
  describe("when buffer is empty", () => {
    const buffer = Buffer.from([])

    test("should return hexadecimal",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toMatch(hexadecimal)
    })

    test("should consisting of 8 chars  ",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toHaveLength(8)
    })

    test("should return hex signed 2's complement",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toEqual("00000000") // as 32-bit signed integer
    })
  })

  describe("when crc of buffer is equal to negative digit", () => {
    const filePath = path.join(__dirname, "./-1337796450-digit.txt")
    const buffer = fs.readFileSync(filePath) // -1337796450 as digit crc

    test("should return hexadecimal",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toMatch(hexadecimal)
    })

    test("should consisting of 8 chars  ",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toHaveLength(8)
    })

    test("should return hex signed 2's complement",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toEqual("b042d89e") // as 32-bit signed integer
    })
  })

  describe("when length of hex has less than 8 chars", () => {
    const filePath = path.join(__dirname, "./86b258e-hex.txt")
    const buffer = fs.readFileSync(filePath) // 86b258e as hex crc

    test("should return hexadecimal",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toMatch(hexadecimal)
    })

    test("should consisting of 8 chars  ",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toHaveLength(8)
    })

    test("should return hex signed 2's complement",  () => {
      const crc32 = countCRC32(buffer)
      expect(crc32).toEqual("086b258e") // as 32-bit signed integer
    })
  })
})
