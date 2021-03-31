/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Days,
  OutlookCalendar,
  OutlookContactResourceItem,
  OutlookEvent,
  OutlookFreq,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import { Contact } from "App/contacts/store/contacts.type"
import axios from "axios"
import { baseGraphUrl } from "Renderer/models/external-providers/outlook/outlook.constants"
import { ContactBuilder } from "Renderer/models/external-providers/outlook/contact-builder"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { Calendar, CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { ByWeekday, Frequency, RRule } from "rrule"
import { WeekdayStr } from "rrule/dist/esm/src/weekday"
import moment from "moment"
import logger from "App/main/utils/logger"

export const getOutlookEndpoint = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.read"
    case OutLookScope.Calendars:
      return "offline_access, https://graph.microsoft.com/calendars.read"
  }
}

export const mapContact = (contact: OutlookContactResourceItem): Contact => {
  const builder = new ContactBuilder()
  return builder
    .addId(contact.id)
    .addFirstName(contact.givenName ?? "")
    .addLastName(contact.surname ?? "")
    .addPhoneNumbers([
      contact.mobilePhone ?? "",
      ...(contact.homePhones ?? []),
      ...(contact.businessPhones ?? []),
    ])
    .addAddress([
      contact.homeAddress ?? {},
      contact.businessAddress ?? {},
      contact.otherAddress ?? {},
    ])
    .addEmailAddress(contact.emailAddresses ?? [])
    .addNote(contact.personalNotes ?? "")
    .build()
}

export const fetchContacts = async (accessToken: string) => {
  const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return data.value.map(mapContact)
}

export const mapCalendars = (calendars: OutlookCalendar[]): Calendar[] => {
  return calendars.map((calendar) => ({
    id: calendar.id,
    name: calendar.name,
    provider: Provider.Outlook,
    primary: calendar.isDefaultCalendar,
  }))
}

export const fetchCalendars = async (
  accessToken: string
): Promise<Calendar[]> => {
  const { data } = await axios.get(`${baseGraphUrl}/me/calendars`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return mapCalendars(data.value)
}

export const mapDay = (day: string): WeekdayStr => {
  switch (day) {
    case Days.monday:
      return "MO"
    case Days.tuesday:
      return "TU"
    case Days.wednesday:
      return "WE"
    case Days.thursday:
      return "TH"
    case Days.friday:
      return "FR"
    case Days.saturday:
      return "SA"
    case Days.sunday:
      return "SU"
    default:
      return "MO"
  }
}

export const mapDays = (value: string[] = []): ByWeekday[] =>
  value.map((day) => mapDay(day))

export const mapFreq = (value: string): Frequency => {
  switch (value) {
    case OutlookFreq.daily:
      return Frequency.DAILY
    case OutlookFreq.weekly:
      return Frequency.WEEKLY
    case OutlookFreq.absoluteMonthly:
      return Frequency.MONTHLY
    case OutlookFreq.relativeMonthly:
      return Frequency.MONTHLY
    case OutlookFreq.absoluteYearly:
      return Frequency.YEARLY
    case OutlookFreq.relativeYearly:
      return Frequency.YEARLY
    default:
      return Frequency.YEARLY
  }
}

export const convertTime = (time: string): string => {
  const timezone = new Date(time).getTimezoneOffset()
  const date = new Date(time).getTime()
  return new Date(date + -timezone * 60000).toISOString()
}

export const mapWkst = (day: string): number => {
  switch (day) {
    case Days.monday:
      return 0
    case Days.tuesday:
      return 1
    case Days.wednesday:
      return 2
    case Days.thursday:
      return 3
    case Days.friday:
      return 4
    case Days.saturday:
      return 5
    case Days.sunday:
      return 6
    default:
      return 0
  }
}

export const mapEvents = (
  events: OutlookEvent[],
  calendarId: string
): CalendarEvent[] =>
  events.map((event) => {
    return {
      id: `${Provider.Outlook}_${event.id}`,
      name: event.subject,
      startDate: convertTime(event.start.dateTime),
      endDate: convertTime(event.end.dateTime),
      ...(event.recurrence
        ? {
            recurrence: new RRule({
              freq: mapFreq(event.recurrence.pattern.type),
              interval: event.recurrence.pattern.interval,
              wkst: mapWkst(event.recurrence.pattern.firstDayOfWeek),
              until: new Date(event.recurrence.range.endDate),
              dtstart: new Date(event.recurrence.range.startDate),
              byweekday: mapDays(event.recurrence.pattern.daysOfWeek),
            }),
          }
        : {}),
      provider: {
        type: Provider.Outlook,
        id: event.id,
        calendarId,
      },
    }
  })

export const fetchEvents = async (
  accessToken: string,
  id: string
): Promise<CalendarEvent[]> => {
  try {
    const {
      data,
    } = await axios.get(
      `${baseGraphUrl}/me/calendars/${id}/calendarView?startDateTime=${moment()
        .startOf("day")
        .toISOString()}&endDateTime=${moment()
        .add(1, "year")
        .endOf("year")
        .toISOString()}&$top=250`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    let nextPage: string = data["@odata.nextLink"]
    let events: OutlookEvent[] = data.value

    while (nextPage) {
      const { data } = await axios.get(nextPage, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      events = [...events, ...data.value]
      nextPage = data["@odata.nextLink"]
    }

    return mapEvents(events, id)
  } catch (error) {
    logger.error(error)
    throw error
  }
}
