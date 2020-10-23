import { GoogleEvent } from "Renderer/models/external-providers/google/google.interface"

export const mockedGoogleEvents: GoogleEvent[] = [
  {
    id: "google-event-1",
    summary: "Felix's Birthday",
    description: "Felix's Birthday",
    start: {
      dateTime: new Date("2020-01-01 11:00").toISOString(),
    },
    end: {
      dateTime: new Date("2020-01-01 14:00").toISOString(),
    },
  },
  {
    id: "google-event-2",
    summary: "Kate's Birthday",
    description: "Kate's Birthday",
    start: {
      dateTime: new Date("2020-02-01 11:00").toISOString(),
    },
    end: {
      dateTime: new Date("2020-02-01 14:00").toISOString(),
    },
  },
  {
    id: "google-event-3",
    summary: "Matthew's Birthday",
    description: "Matthew's Birthday",
    start: {
      dateTime: new Date("2020-03-05 10:00").toISOString(),
    },
    end: {
      dateTime: new Date("2020-03-05 12:00").toISOString(),
    },
  },
  {
    id: "google-event-4",
    summary: "John's Birthday",
    description: "John's Birthday",
    start: {
      dateTime: new Date("2020-08-08 9:00").toISOString(),
    },
    end: {
      dateTime: new Date("2020-08-08 10:00").toISOString(),
    },
  },
]
