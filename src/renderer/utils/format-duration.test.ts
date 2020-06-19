import formatDuration from "Renderer/utils/format-duration"

test("returns proper duration for 0s with short notation of zero value", () => {
  expect(formatDuration(0)).toBe("0s")
})

test("returns proper duration for 0s without short notation of zero value", () => {
  expect(formatDuration(0, false)).toBe("0m 0s")
})

test("returns proper duration for several dozens of seconds", () => {
  expect(formatDuration(45)).toBe("45s")
})

test("returns proper duration for several dozens of minutes", () => {
  expect(formatDuration(1860)).toBe("31m")
  expect(formatDuration(1890)).toBe("31m 30s")
})

test("returns proper duration for several dozens of hours", () => {
  expect(formatDuration(54000)).toBe("15h")
  expect(formatDuration(56760)).toBe("15h 46m")
  expect(formatDuration(54029)).toBe("15h 29s")
  expect(formatDuration(56789)).toBe("15h 46m 29s")
})

test("returns proper duration for several dozens of days", () => {
  expect(formatDuration(4492800)).toBe("52d")
  expect(formatDuration(4492830)).toBe("52d 30s")
  expect(formatDuration(4495860)).toBe("52d 51m")
  expect(formatDuration(4564800)).toBe("52d 20h")
  expect(formatDuration(4495890)).toBe("52d 51m 30s")
  expect(formatDuration(4564830)).toBe("52d 20h 30s")
  expect(formatDuration(4567860)).toBe("52d 20h 51m")
  expect(formatDuration(4567890)).toBe("52d 20h 51m 30s")
})
