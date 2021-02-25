/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import RRule from "rrule"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import moment from "moment"

const messages = defineMessages({
  updatedDescriptionTitle: {
    id: "view.name.calendar.duplicatedEvent.updatedDescriptionTitle",
  },
  name: {
    id: "view.name.calendar.duplicatedEvent.name",
  },
  startDate: {
    id: "view.name.calendar.duplicatedEvent.startDate",
  },
  endDate: {
    id: "view.name.calendar.duplicatedEvent.endDate",
  },
  recurrence: {
    id: "view.name.calendar.duplicatedEvent.recurrence",
  },
  description: {
    id: "view.name.calendar.duplicatedEvent.description",
  },
})

export const createEventUID = (event: CalendarEvent): string => {
  const ids = [
    event.provider?.type,
    event.provider?.calendarId,
    event.provider?.id || event.id,
  ]
  return ids.filter((id) => Boolean(id)).join("_")
}

export const findDuplicate = (
  oldEvents: CalendarEvent[],
  newEvent: CalendarEvent
): CalendarEvent | undefined => {
  return oldEvents.find(
    (event) => createEventUID(event) === createEventUID(newEvent)
  )
}

export const findDifferences = (
  { name, startDate, endDate, recurrence, description }: CalendarEvent,
  newEvent: CalendarEvent
): string => {
  const diffs: string[] = []

  if (name !== newEvent.name) {
    diffs.push(`${intl.formatMessage(messages.name)}: ${name}`)
  }

  if (startDate !== newEvent.startDate) {
    diffs.push(`${intl.formatMessage(messages.startDate)}: ${startDate}`)
  }

  if (endDate !== newEvent.endDate) {
    diffs.push(`${intl.formatMessage(messages.endDate)}: ${endDate}`)
  }

  if (
    recurrence &&
    JSON.stringify(recurrence) !== JSON.stringify(newEvent.recurrence)
  ) {
    const recurrenceRule = new RRule(recurrence.origOptions).toText()
    diffs.push(`${intl.formatMessage(messages.recurrence)}: ${recurrenceRule}`)
  }

  if (description && description !== newEvent.description) {
    diffs.push(`${intl.formatMessage(messages.description)}: ${description}`)
  }

  return diffs.join("\n").trim()
}

export const extendDescription = (
  oldDescription?: string,
  newDescription?: string
): string => {
  const descriptionParts = []
  const description = oldDescription?.trim()

  if (newDescription) {
    descriptionParts.push(newDescription)
  }

  if (description) {
    descriptionParts.push("~~~~~~~~~~~~~~~~~~~~")
    descriptionParts.push(
      `~~ ${intl.formatMessage(messages.updatedDescriptionTitle, {
        date: moment().format("Y-MM-DD"),
      })} ~~`
    )
    descriptionParts.push(description)
  }

  return descriptionParts.join("\n")
}

const overwriteDuplicates = (
  oldEvents: CalendarEvent[],
  newEvents: CalendarEvent[]
): CalendarEvent[] => {
  const newOverwrittenEvents: CalendarEvent[] = []
  const nonDuplicateOldEvents: CalendarEvent[] = [...oldEvents]

  newEvents.forEach((event) => {
    const duplicate = findDuplicate(nonDuplicateOldEvents, event)
    const newEvent = { ...event }

    if (duplicate) {
      nonDuplicateOldEvents.splice(nonDuplicateOldEvents.indexOf(duplicate), 1)
      const differences = findDifferences(duplicate, event)

      if (differences) {
        newEvent.description = extendDescription(differences, event.description)
      }
    }

    newOverwrittenEvents.push(newEvent)
  })

  return [...newOverwrittenEvents, ...nonDuplicateOldEvents]
}

export default overwriteDuplicates
