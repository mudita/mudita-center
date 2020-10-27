import { GoogleEvent } from "Renderer/models/external-providers/google/google.interface"

export const mockedGoogleEvents: GoogleEvent[] = [
  {
    id: "google-event-1",
    summary: "Felix's Birthday",
    description: "Felix's Birthday",
    start: { dateTime: "2020-01-01T10:00:00.000Z" },
    end: { dateTime: "2020-01-01T13:00:00.000Z" },
  },
  {
    id: "google-event-2",
    summary: "Kate's Birthday",
    description: "Kate's Birthday",
    start: { dateTime: "2020-02-01T10:00:00.000Z" },
    end: { dateTime: "2020-02-01T13:00:00.000Z" },
  },
  {
    id: "google-event-3",
    summary: "Matthew's Birthday",
    description: "Matthew's Birthday",
    start: { dateTime: "2020-03-05T09:00:00.000Z" },
    end: { dateTime: "2020-03-05T11:00:00.000Z" },
  },
  {
    id: "google-event-4",
    summary: "John's Birthday",
    description: "John's Birthday",
    start: { dateTime: "2020-08-08T07:00:00.000Z" },
    end: { dateTime: "2020-08-08T08:00:00.000Z" },
  },
]
