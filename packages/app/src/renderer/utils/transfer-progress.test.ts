import transferProgress from "Renderer/utils/transfer-progress"

const [zero, half, full] = [0, 5678, 10000]
const startTime = (new Date().getTime() - 5000) / 1000

test("returns the same received bytes as passed in param", () => {
  const { received } = transferProgress(full, half, startTime)
  expect(received).toEqual(half)
})

test("returns proper values when downloading starts", () => {
  const { percent, timeLeft, speed } = transferProgress(full, zero, startTime)
  expect(percent).toEqual(zero)
  expect(timeLeft).toBeUndefined()
  expect(speed).toEqual(0)
})

test("returns proper values when downloading starts and file size is unknown", () => {
  const { total, percent, timeLeft, speed } = transferProgress(
    zero,
    zero,
    startTime
  )
  expect(total).toBeUndefined()
  expect(percent).toBeUndefined()
  expect(timeLeft).toBeUndefined()
  expect(speed).toEqual(0)
})

test("returns proper values when downloading file", () => {
  const { percent, timeLeft, speed } = transferProgress(full, half, startTime)
  expect(percent).toEqual(Number(((half / full) * 100).toFixed(2)))
  expect(timeLeft).toBeGreaterThan(0)
  expect(speed).toBeGreaterThan(0)
})

test("returns proper values when downloading file of unknown size", () => {
  const { percent, timeLeft, speed } = transferProgress(zero, half, startTime)
  expect(percent).toBeUndefined()
  expect(timeLeft).toBeUndefined()
  expect(speed).toBeGreaterThan(0)
})

test("returns proper values when downloading finishes", () => {
  const { total, received, percent, timeLeft } = transferProgress(
    full,
    full,
    startTime
  )
  expect(total).toEqual(received)
  expect(percent).toEqual(100)
  expect(timeLeft).toEqual(0)
})
