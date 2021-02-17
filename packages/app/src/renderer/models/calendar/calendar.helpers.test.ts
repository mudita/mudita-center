import { mapRecurringEvents } from "Renderer/models/calendar/calendar.helpers"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

const input: CalendarEvent[] = [
  {
    id: "google_2e9j542tthmf7glidvdlr63kk6",
    name: "Mudita Center - retrospection",
    startDate: "2021-01-12T09:30:00.000Z",
    endDate: "2021-01-12T10:15:00.000Z",
    recurrence: {
      _cache: null,
      origOptions: {
        freq: 2,
        // wkst: ,
        until: new Date("2021-05-31T21:59:59.000Z"),
        interval: 2,
        wkst:
        // byweekday: [
        //   {
        //     weekday: 1,
        //   },
        // ],
      },
      options: {
        freq: 2,
        dtstart: new Date("2021-02-17T14:17:51.000Z"),
        interval: 2,
        wkst: 6,
        count: null,
        until: new Date("2021-05-31T21:59:59.000Z"),
        bysetpos: [1],
        bymonth: [1],
        bymonthday: [],
        bynmonthday: [],
        byyearday: [1],
        byweekno: [1],
        byweekday: [1],
        bynweekday: null,
        byhour: [14],
        byminute: [17],
        bysecond: [51],
        byeaster: null,
        tzid: null
      },
    },
    provider: {
      type: Provider.Google,
      id: "2e9j542tthmf7glidvdlr63kk6",
    },
  },
]

test("should ", () => {
  const result = mapRecurringEvents(input)
  console.log(result)
})
