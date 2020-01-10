import { convertBytes } from "Renderer/utils/convert-bytes"
const oneKbInBytes = 1024
const tenMbInBytes = 10485760
const fourGbInBytes = 4294967296
const oneTbInBytes = 1099511627776

test("returns n/a when 0 bytes provided", () => {
  expect(convertBytes(0)).toBe("n/a")
})

test("returns correct format in bytes", () => {
  expect(convertBytes(1000)).toBe("1000 B")
})

test("returns correct format in B", () => {
  expect(convertBytes(1)).toBe("1 B")
})

test("returns correct format in KB", () => {
  expect(convertBytes(oneKbInBytes)).toBe("1.0 KB")
})

test("returns correct format in MB", () => {
  expect(convertBytes(tenMbInBytes)).toBe("10.0 MB")
})

test("returns correct format in GB", () => {
  expect(convertBytes(fourGbInBytes)).toBe("4.0 GB")
})

test("returns correct format in TB", () => {
  expect(convertBytes(oneTbInBytes)).toBe("1.0 TB")
})
