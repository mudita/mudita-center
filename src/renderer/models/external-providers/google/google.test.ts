import {
  createStore,
  googleEndpoints,
} from "Renderer/models/external-providers/google/google"
import { GoogleAuthSuccessResponse } from "Renderer/models/external-providers/google/google.interface"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockedGoogleCalendars } from "App/__mocks__/google-calendars-list"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import { mockedGoogleEvents } from "App/__mocks__/google-events-list"
import moment from "moment"
import { init } from "@rematch/core"

const authData: GoogleAuthSuccessResponse = {
  access_token: "some-token",
  token_type: "Bearer",
  expires_in: 3599,
  scope: "Calendars Contacts",
}

const axiosMock = new MockAdapter(axios)

jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      callMain: (channel: GoogleAuthActions) => {
        switch (channel) {
          case GoogleAuthActions.OpenWindow:
            return jest.fn()
          default:
            return false
        }
      },
      answerMain: (
        channel: GoogleAuthActions,
        callback: (data: any) => PromiseLike<any>
      ) => {
        switch (channel) {
          case GoogleAuthActions.GotCredentials:
            callback(JSON.stringify(authData))
            return true
          default:
            return false
        }
      },
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

const initStore = () => {
  return init({
    models: { google: createStore() },
  })
}

let store = initStore()

beforeEach(() => {
  store = initStore()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "google": Object {
        "auth": Object {},
        "invalidRequests": 0,
      },
    }
  `)
})

test("invalid request counter increments properly", () => {
  expect(store.getState().google.invalidRequests).toEqual(0)
  store.dispatch.google.incrementInvalidRequests()
  expect(store.getState().google.invalidRequests).toEqual(1)
})

test("invalid request counter resets properly", () => {
  store.dispatch.google.incrementInvalidRequests()
  store.dispatch.google.resetInvalidRequests()
  expect(store.getState().google.invalidRequests).toEqual(0)
})

test("auth data is set properly", () => {
  store.dispatch.google.setAuthData(authData)
  expect(store.getState().google.auth).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "scope": "Calendars Contacts",
      "token_type": "Bearer",
    }
  `)
})

test("active calendar is set properly", () => {
  store.dispatch.google.setActiveCalendarId("calendar-id-123")
  expect(store.getState().google.activeCalendarId).toBe("calendar-id-123")
})

test("authorization works properly", async () => {
  await store.dispatch.google.authorize()
  expect(store.getState().google.auth).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "scope": "Calendars Contacts",
      "token_type": "Bearer",
    }
  `)
})

test("calendars from google are received properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(200, {
      items: mockedGoogleCalendars,
    })

  expect(await store.dispatch.google.getCalendars()).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "calendar-123",
        "name": "My calendar",
        "primary": true,
        "provider": "google",
      },
      Object {
        "id": "calendar-456",
        "name": "Work calendar",
        "primary": undefined,
        "provider": "google",
      },
      Object {
        "id": "calendar-789",
        "name": "John's calendar",
        "primary": undefined,
        "provider": "google",
      },
    ]
  `)
})

test("calendars api error from google is caught properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(404)

  expect(await store.dispatch.google.getCalendars()).toMatchInlineSnapshot(
    `[Error: No calendars found]`
  )
})

test("events from google are received properly", async () => {
  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: moment().startOf("day").toISOString(),
    timeMax: moment().add(1, "year").endOf("year").toISOString(),
    maxResults: "1000",
  })
  axiosMock
    .onGet(
      `${
        googleEndpoints.calendars
      }/calendars/calendar-id-123/events?${params.toString()}`
    )
    .reply(200, {
      items: mockedGoogleEvents,
    })

  store.dispatch.google.setActiveCalendarId("calendar-id-123")
  expect(await store.dispatch.google.getEvents()).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "Felix's Birthday",
        "endDate": "2020-01-01T13:00:00.000Z",
        "id": "google_google-event-1",
        "name": "Felix's Birthday",
        "provider": Object {
          "id": "google-event-1",
          "type": "google",
        },
        "startDate": "2020-01-01T10:00:00.000Z",
      },
      Object {
        "description": "Kate's Birthday",
        "endDate": "2020-02-01T13:00:00.000Z",
        "id": "google_google-event-2",
        "name": "Kate's Birthday",
        "provider": Object {
          "id": "google-event-2",
          "type": "google",
        },
        "startDate": "2020-02-01T10:00:00.000Z",
      },
      Object {
        "description": "Matthew's Birthday",
        "endDate": "2020-03-05T11:00:00.000Z",
        "id": "google_google-event-3",
        "name": "Matthew's Birthday",
        "provider": Object {
          "id": "google-event-3",
          "type": "google",
        },
        "startDate": "2020-03-05T09:00:00.000Z",
      },
      Object {
        "description": "John's Birthday",
        "endDate": "2020-08-08T08:00:00.000Z",
        "id": "google_google-event-4",
        "name": "John's Birthday",
        "provider": Object {
          "id": "google-event-4",
          "type": "google",
        },
        "startDate": "2020-08-08T07:00:00.000Z",
      },
    ]
  `)
})

test("events from google are not received if no calendar is chosen", async () => {
  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: moment().startOf("day").toISOString(),
    timeMax: moment().add(1, "year").endOf("year").toISOString(),
    maxResults: "1000",
  })
  axiosMock
    .onGet(
      `${
        googleEndpoints.calendars
      }/calendars/calendar-id-123/events?${params.toString()}`
    )
    .reply(200, {
      items: mockedGoogleEvents,
    })

  expect(await store.dispatch.google.getEvents()).toMatchInlineSnapshot(
    `[Error: No calendar is selected]`
  )
})

test("events api error from google is caught properly", async () => {
  const params = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: moment().startOf("day").toISOString(),
    timeMax: moment().add(1, "year").endOf("year").toISOString(),
    maxResults: "1000",
  })
  axiosMock
    .onGet(
      `${
        googleEndpoints.calendars
      }/calendars/calendar-id-123/events?${params.toString()}`
    )
    .reply(404)

  store.dispatch.google.setActiveCalendarId("calendar-id-123")
  expect(await store.dispatch.google.getEvents()).toMatchInlineSnapshot(
    `[TypeError: Cannot read property 'nextPageToken' of undefined]`
  )
})
