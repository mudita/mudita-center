/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  convertTime,
  getOutlookEndpoint,
  mapDay,
  mapDays,
  mapFreq,
  mapWkst,
} from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.helpers"
import { OutLookScope } from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

const scope = "offline_access, https://graph.microsoft.com/contacts.read"

test("getOutlookEndpoint returns proper value", () => {
  expect(getOutlookEndpoint(OutLookScope.Contacts)).toBe(scope)
})

test("mapDay return proper value", () => {
  expect(mapDay("tuesday")).toBe("TU")
  expect(mapDay("")).toBe("MO")
  expect(mapDay("saturday")).toBe("SA")
})

test("mapDays return proper value", () => {
  const days = ["tuesday", "saturday"]
  expect(mapDays(days)).toEqual(["TU", "SA"])
})

test("mapFreq return proper value", () => {
  expect(mapFreq("daily")).toBe(3)
  expect(mapFreq("weekly")).toBe(2)
  expect(mapFreq("relativeMonthly")).toBe(1)
  expect(mapFreq("absoluteYearly")).toBe(0)
  expect(mapFreq("")).toBe(0)
})

test("convertTime returns proper time", () => {
  const time1 = "2021-03-31T00:00:00.0000000"
  expect(convertTime(time1)).toBe("2021-03-31T00:00:00.000Z")

  const time2 = "2021-04-02T07:30:00.0000000"
  expect(convertTime(time2)).toBe("2021-04-02T07:30:00.000Z")
})

test("mapWkst returns proper value", () => {
  expect(mapWkst("sunday")).toEqual(6)
  expect(mapWkst("")).toEqual(0)
  expect(mapWkst("friday")).toEqual(4)
})
