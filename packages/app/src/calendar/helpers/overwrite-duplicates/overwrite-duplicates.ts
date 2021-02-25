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

export const descriptionSeparator = "~~~~~~~~~~~~~~~~~~~~"

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

export const parseDescription = (
  description?: string
): {
  text: string
  metadata: string
} => {
  if (description) {
    const [text = "", ...metadata] = description.split(descriptionSeparator)

    return {
      text: text.trim(),
      metadata: metadata[0]
        ? `${descriptionSeparator}\n` +
          metadata.join(descriptionSeparator).trim()
        : "",
    }
  }

  return {
    text: "",
    metadata: "",
  }
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

  if (
    parseDescription(description).text !==
    parseDescription(newEvent.description).text
  ) {
    diffs.push(
      `${intl.formatMessage(messages.description)}: ${
        parseDescription(description).text
      }`
    )
  }

  return diffs.join("\n").trim()
}

const overwriteDuplicates = ({
  oldEvents,
  newEvents,
}: {
  oldEvents: CalendarEvent[]
  newEvents: CalendarEvent[]
}): CalendarEvent[] => {
  const newOverwrittenEvents: CalendarEvent[] = []
  const nonDuplicateOldEvents: CalendarEvent[] = [...oldEvents]

  newEvents.forEach((event) => {
    const duplicate = findDuplicate(nonDuplicateOldEvents, event)
    const newEvent = { ...event }

    if (duplicate) {
      const descriptionParts = []
      const oldDescription = parseDescription(duplicate.description)
      const differences = findDifferences(duplicate, event)

      if (newEvent.description) {
        descriptionParts.push(newEvent.description)
      } else if (newEvent.description === undefined) {
        descriptionParts.push(oldDescription.text)
      }

      if (differences) {
        descriptionParts.push(descriptionSeparator)
        descriptionParts.push(
          `~~ ${intl.formatMessage(messages.updatedDescriptionTitle, {
            date: moment().format("Y-MM-DD"),
          })} ~~`
        )
        descriptionParts.push(differences)
      }

      descriptionParts.push(oldDescription.metadata)

      newEvent.description = descriptionParts.join("\n").trim()

      nonDuplicateOldEvents.splice(nonDuplicateOldEvents.indexOf(duplicate), 1)
    }

    newOverwrittenEvents.push(newEvent)
  })

  return [...newOverwrittenEvents, ...nonDuplicateOldEvents]
}

export default overwriteDuplicates
