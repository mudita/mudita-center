import path from "path"
import parseIcs from "App/calendar/helpers/parse-ics/parse-ics"

test("correct amount of events returned from single file", async () => {
  const eventsFromSingleCalendar = await parseIcs([
    path.join(__dirname, "./calendar.ics"),
  ])
  expect(eventsFromSingleCalendar).toHaveLength(2)
})

test("correct amount of events returned from multiple files", async () => {
  const eventsFromMultipleCalendars = await parseIcs([
    path.join(__dirname, "./calendar.ics"),
    path.join(__dirname, "./calendar-recurring-events.ics"),
  ])
  expect(eventsFromMultipleCalendars).toHaveLength(12)
})

test("correct amount of events returned from calendar with recurring events", async () => {
  const eventsFromMultipleCalendars = await parseIcs([
    path.join(__dirname, "./calendar-recurring-events.ics"),
  ])
  expect(eventsFromMultipleCalendars).toHaveLength(10)
})
