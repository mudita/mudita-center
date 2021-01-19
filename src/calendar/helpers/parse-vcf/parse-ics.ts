import ical from "node-ical"

const parseIcs = async (files: string[]) => {
  const parsedEvents: any[] = []
  for (const file of files) {
    const calendarEvents = await ical.async.parseFile(file)
    parsedEvents.push(calendarEvents)
  }
  return parsedEvents
}

export default parseIcs
