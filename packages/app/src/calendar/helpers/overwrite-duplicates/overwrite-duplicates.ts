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
    const recurrenceRule = new RRule(recurrence.origOptions).toString()
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
  const descriptionParts = [newDescription]

  if (oldDescription) {
    descriptionParts.push("~~~~~~~~~~~~~~~~~~~~")
    descriptionParts.push(
      intl.formatMessage(messages.updatedDescriptionTitle, {
        date: moment().format("Y-MM-DD"),
      })
    )
    descriptionParts.push("~~~~~~~~~~~~~~~~~~~~")
    descriptionParts.push(oldDescription)
  }

  return descriptionParts.filter((chunk) => Boolean(chunk)).join("\n")
}

const overwriteDuplicates = (
  oldEvents: CalendarEvent[],
  newEvents: CalendarEvent[]
): CalendarEvent[] => {
  const newOverwrittenEvents: CalendarEvent[] = []
  const uniqueOldEvents: CalendarEvent[] = [...oldEvents]

  newEvents.forEach((event) => {
    const duplicate = findDuplicate(uniqueOldEvents, event)
    let newEvent = { ...event }

    if (duplicate) {
      uniqueOldEvents.splice(uniqueOldEvents.indexOf(duplicate), 1)
      const differences = findDifferences(duplicate, event)

      if (differences) {
        newEvent.description = extendDescription(differences, event.description)
      }
    }

    newOverwrittenEvents.push(newEvent)
  })

  return [...newOverwrittenEvents, ...uniqueOldEvents]
}

export default overwriteDuplicates
