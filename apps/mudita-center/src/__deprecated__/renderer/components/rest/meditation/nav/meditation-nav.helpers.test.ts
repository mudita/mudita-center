/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  formatDate,
  dateWithinThisWeek,
} from "App/__deprecated__/renderer/components/rest/meditation/nav/meditation-nav.helpers"

afterEach(() => {
  jest.clearAllMocks()
})

const startDate = 1594677600000 // 2020-07-14
const endDate = 1595109600000 // 2020-07-19
const mockedDate = 1594977157202 // 2020-07-17

test("properly treats date passed as string", () => {
  expect(formatDate("10.10.10") instanceof Date).toBeTruthy()
})

test("properly treats date passed as number", () => {
  expect(formatDate(mockedDate) instanceof Date).toBeTruthy()
})

test("properly tells if dates are within current week", () => {
  jest.spyOn(Date, "now").mockImplementation(() => mockedDate)

  expect(dateWithinThisWeek({ startDate, endDate })).toBeTruthy()
  expect(
    dateWithinThisWeek({ startDate: 1593591200000, endDate: 1593109600000 })
  ).toBeFalsy()
})
