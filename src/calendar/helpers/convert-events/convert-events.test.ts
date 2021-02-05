import { convertEvents } from "App/calendar/helpers/convert-events/convert-events"
import { eventsData } from "App/seeds/calendar"
import fs from "fs"
import path from "path"

const filePath = "file.ics"

test("should ", () => {
  convertEvents(eventsData, filePath)
  expect(fs.existsSync(path.resolve(filePath))).toBeTruthy()
})
