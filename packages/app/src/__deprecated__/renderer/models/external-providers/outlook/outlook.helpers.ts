/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Days,
  OutlookCalendar,
  OutlookContactResource,
  OutlookContactResourceItem,
  OutlookEvent,
  OutlookFreq,
  OutLookScope,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import axios from "axios"
import { baseGraphUrl } from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.constants"
import { ContactBuilder } from "App/__deprecated__/renderer/models/external-providers/outlook/contact-builder"
import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import {
  Calendar,
  CalendarEvent,
} from "App/__deprecated__/calendar/store/calendar.interfaces"
import { ByWeekday, Frequency, RRule, WeekdayStr } from "rrule"
import moment from "moment"
import logger from "App/__deprecated__/main/utils/logger"

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

const getAllOutlookContactResourceItems = async (
  url: string,
  accessToken: string,
  prevItems: OutlookContactResourceItem[] = []
): Promise<OutlookContactResourceItem[]> => {
  const headers = { Authorization: `Bearer ${accessToken}` }
  const { data } = await axios.get<OutlookContactResource>(url, { headers })
  const items = [...prevItems, ...data.value]

  if (data["@odata.nextLink"] !== undefined) {
    return getAllOutlookContactResourceItems(
      data["@odata.nextLink"],
      accessToken,
      items
    )
  } else {
    return items
  }
}

export const fetchContacts = async (
  accessToken: string
): Promise<Contact[]> => {
  const items = await getAllOutlookContactResourceItems(
    `${baseGraphUrl}/me/contacts`,
    accessToken
  )
  return items.map(mapContact)
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get(`${baseGraphUrl}/me/calendars`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return mapCalendars(data.value)
}

export const mapDay = (day: string): WeekdayStr => {
  switch (day) {
    case Days.Monday:
      return "MO"
    case Days.Tuesday:
      return "TU"
    case Days.Wednesday:
      return "WE"
    case Days.Thursday:
      return "TH"
    case Days.Friday:
      return "FR"
    case Days.Saturday:
      return "SA"
    case Days.Sunday:
      return "SU"
    default:
      return "MO"
  }
}

export const mapDays = (value: string[] = []): ByWeekday[] =>
  value.map((day) => mapDay(day))

export const mapFreq = (value: string): Frequency => {
  switch (value) {
    case OutlookFreq.Daily:
      return Frequency.DAILY
    case OutlookFreq.Weekly:
      return Frequency.WEEKLY
    case OutlookFreq.AbsoluteMonthly:
      return Frequency.MONTHLY
    case OutlookFreq.RelativeMonthly:
      return Frequency.MONTHLY
    case OutlookFreq.AbsoluteYearly:
      return Frequency.YEARLY
    case OutlookFreq.RelativeYearly:
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
    case Days.Monday:
      return 0
    case Days.Tuesday:
      return 1
    case Days.Wednesday:
      return 2
    case Days.Thursday:
      return 3
    case Days.Friday:
      return 4
    case Days.Saturday:
      return 5
    case Days.Sunday:
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await axios.get(
      `${baseGraphUrl}/me/calendars/${id}/calendarView?startDateTime=${moment()
        .startOf("day")
        .toISOString()}&endDateTime=${moment()
        .add(1, "year")
        .endOf("year")
        .toISOString()}&$top=250`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    let nextPage: string = data["@odata.nextLink"]
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    let events: OutlookEvent[] = data.value

    while (nextPage) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.get(nextPage, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      events = [...events, ...data.value]
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      nextPage = data["@odata.nextLink"]
    }

    return mapEvents(events, id)
  } catch (error) {
    logger.error(
      `Outlook Client: get events request fail. Data: ${JSON.stringify(error)}`
    )
    throw error
  }
}
