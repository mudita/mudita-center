/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  convertTime,
  getOutlookEndpoint,
  mapCalendars,
  mapDay,
  mapDays,
  mapEvents,
  mapFreq,
  mapWkst,
} from "Renderer/models/external-providers/outlook/outlook.helpers"
import {
  OutlookCalendar,
  OutlookEvent,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"

const scope = "offline_access, https://graph.microsoft.com/contacts.read"

test("getOutlookEndpoint returns proper value", () => {
  expect(getOutlookEndpoint(OutLookScope.Contacts)).toBe(scope)
})

test("mapCalendars returns proper values", () => {
  const calendar: OutlookCalendar[] = [
    {
      id:
        "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAIBBgAAAKDVfFOEmcdKhNFYkpYqCvYAAAAEnFEKAAAA",
      name: "Calendar",
      color: "lightPink",
      hexColor: "#e3008c",
      isDefaultCalendar: false,
      changeKey: "oNV8U4SZx0qE0ViSlioK9gAABJtBBg==",
      canShare: true,
      canViewPrivateItems: true,
      canEdit: true,
      allowedOnlineMeetingProviders: ["skypeForConsumer"],
      defaultOnlineMeetingProvider: "skypeForConsumer",
      isTallyingResponses: false,
      isRemovable: true,
      owner: { name: "Jon Doe", address: "example@mudita.com" },
    },
  ]
  const calendarAfterMap = [
    {
      id:
        "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAIBBgAAAKDVfFOEmcdKhNFYkpYqCvYAAAAEnFEKAAAA",
      name: "Calendar",
      primary: false,
      provider: "outlook",
    },
  ]
  expect(mapCalendars(calendar)).toMatchObject(calendarAfterMap)
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

test("mapEvents returns proper value", () => {
  const event: OutlookEvent[] = [
    {
      id:
        "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAAEnBo4AAAAoNV8U4SZx0qE0ViSlioK9gAAAAwh-LYAAAA=",
      subject: "recur",
      isAllDay: false,
      start: { dateTime: "2021-04-02T07:30:00.0000000", timeZone: "UTC" },
      end: { dateTime: "2021-04-02T08:00:00.0000000", timeZone: "UTC" },
      recurrence: {
        pattern: {
          type: "daily",
          interval: 1,
          month: 0,
          daysOfWeek: [],
          dayOfMonth: 0,
          firstDayOfWeek: "sunday",
          index: "first",
        },

        range: {
          type: "endDate",
          startDate: "2021-04-02",
          endDate: "2030-08-17",
          recurrenceTimeZone: "Central European Standard Time",
          numberOfOccurrences: 0,
        },
      },
    },
  ]
  const output = [
    {
      endDate: "2021-04-02T08:00:00.000Z",
      id:
        "outlook_AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAAEnBo4AAAAoNV8U4SZx0qE0ViSlioK9gAAAAwh-LYAAAA=",
      name: "recur",
      provider: {
        calendarId: "123",
        id:
          "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAAEnBo4AAAAoNV8U4SZx0qE0ViSlioK9gAAAAwh-LYAAAA=",
        type: "outlook",
      },
      recurrence: {
        _cache: { after: [], all: false, before: [], between: [] },
        options: {
          byeaster: null,
          byhour: [0],
          byminute: [0],
          bymonth: null,
          bymonthday: [],
          bynmonthday: [],
          bynweekday: null,
          bysecond: [0],
          bysetpos: null,
          byweekday: null,
          byweekno: null,
          byyearday: null,
          count: null,
          dtstart: new Date("2021-04-02T00:00:00.000Z"),
          freq: 3,
          interval: 1,
          tzid: null,
          until: new Date("2030-08-17T00:00:00.000Z"),
          wkst: 6,
        },
        origOptions: {
          byweekday: [],
          dtstart: new Date("2021-04-02T00:00:00.000Z"),
          freq: 3,
          interval: 1,
          until: new Date("2030-08-17T00:00:00.000Z"),
          wkst: 6,
        },
      },
      startDate: "2021-04-02T07:30:00.000Z",
    },
  ]
  expect(mapEvents(event, "123")).toEqual(output)
})
