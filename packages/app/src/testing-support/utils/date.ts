/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mockDate = (expected: Date) => {
  const _Date = Date

  // If any Date or number is passed to the constructor
  // use that instead of our mocked date
  function MockDate(mockOverride?: Date | number) {
    return new _Date(mockOverride || expected)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  MockDate.UTC = _Date.UTC
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  MockDate.parse = _Date.parse
  MockDate.now = () => expected.getTime()
  // Give our mock Date has the same prototype as Date
  // Some libraries rely on this to identify Date objects
  MockDate.prototype = _Date.prototype

  // Our mock is not a full implementation of Date
  // Types will not match but it's good enough for our tests
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  global.Date = MockDate as any

  // Callback function to remove the Date mock
  return () => {
    global.Date = _Date
  }
}
