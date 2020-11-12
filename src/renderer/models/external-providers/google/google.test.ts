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
import {
  mapCalendars,
  mapEvents,
} from "Renderer/models/external-providers/google/google.helpers"
import { init } from "@rematch/core"
import { mockedGoogleContacts } from "App/__mocks__/google-contacts"

const authData: GoogleAuthSuccessResponse = {
  access_token: "some-token",
  token_type: "Bearer",
  expires_in: 3599,
  scope: "Calendars Contacts",
  refresh_token: "refresh-token-123",
}

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
            // callback(JSON.stringify({ error: "some error" }))
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
let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  store = initStore()
  axiosMock = new MockAdapter(axios)
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "google": Object {
        "auth": Object {},
      },
    }
  `)
})

test("auth data is set properly", () => {
  store.dispatch.google.setAuthData(authData)
  expect(store.getState().google.auth).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "refresh_token": "refresh-token-123",
      "scope": "Calendars Contacts",
      "token_type": "Bearer",
    }
  `)
})

test("authorization handles error properly", async () => {
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
              // callback(JSON.stringify(authData))
              callback(JSON.stringify({ error: "some error" }))
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

  await store.dispatch.google.authorize()
  expect(store.getState().google.auth).toMatchInlineSnapshot(`
    Object {
      "access_token": "some-token",
      "expires_in": 3599,
      "refresh_token": "refresh-token-123",
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

  try {
    await store.dispatch.google.getCalendars()
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    expect(error).toStrictEqual(
      new Error("Request failed with status code 404")
    )
  }
})

test("empty calendars list from api is caught properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(200)

  try {
    await store.dispatch.google.getCalendars()
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    expect(error).toStrictEqual(new Error("No calendars found"))
  }
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

  expect(await store.dispatch.google.getEvents("calendar-id-123"))
    .toMatchInlineSnapshot(`
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

  try {
    await store.dispatch.google.getEvents()
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    expect(error).toStrictEqual(new Error("No calendar is selected"))
  }
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

  try {
    await store.dispatch.google.getEvents("calendar-id-123")
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    expect(error).toStrictEqual(
      new Error("Request failed with status code 404")
    )
  }
})

test("requestWrapper handles 401 error properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .replyOnce(401)
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(200, {
      items: mockedGoogleCalendars,
    })
    .onPost(
      `${process.env.MUDITA_GOOGLE_REFRESH_TOKEN_URL}?refreshToken=refresh-token-123`
    )
    .reply(200, authData)

  expect(
    (
      await store.dispatch.google.requestWrapper({
        url: `${googleEndpoints.calendars}/users/me/calendarList`,
      })
    ).data.items
  ).toHaveLength(mockedGoogleCalendars.length)
})

test("requestWrapper handles other errors properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .replyOnce(404)
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(200, {
      items: mockedGoogleCalendars,
    })

  expect(
    (
      await store.dispatch.google.requestWrapper({
        url: `${googleEndpoints.calendars}/users/me/calendarList`,
      })
    ).data.items
  ).toHaveLength(mockedGoogleCalendars.length)
})

test("requestWrapper handles no access token error properly", async () => {
  axiosMock
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .replyOnce(404)
    .onGet(`${googleEndpoints.calendars}/users/me/calendarList`)
    .reply(200, {
      items: mockedGoogleCalendars,
    })

  let requestError: Error = new Error()

  try {
    await store.dispatch.google.requestWrapper({
      url: `${googleEndpoints.calendars}/users/me/calendarList`,
    })
  } catch (error) {
    requestError = error
  }

  expect(requestError).toStrictEqual(new Error())
})

test("google events are mapped properly", () => {
  expect(mapEvents(mockedGoogleEvents)).toMatchInlineSnapshot(`
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

test("google events are mapped properly", () => {
  expect(mapCalendars(mockedGoogleCalendars)).toMatchInlineSnapshot(`
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

test("contacts are received properly", async () => {
  axiosMock
    .onGet(
      `${googleEndpoints.people}/people/me/connections?personFields=names,addresses,phoneNumbers,emailAddresses`
    )
    .reply(200, mockedGoogleContacts)

  expect(await store.dispatch.google.getContacts()).toMatchInlineSnapshot(`
    Array [
      Object {
        "blocked": false,
        "email": "bombol@bombol.com",
        "favourite": false,
        "firstAddressLine": "bomboladzka 1",
        "firstName": "Bombolo Bombolada",
        "ice": false,
        "id": "people/c5420759609842671821",
        "note": "",
        "primaryPhoneNumber": "11111111111111",
        "secondAddressLine": "00-123",
      },
      Object {
        "blocked": false,
        "email": "alolo@bombol.pl",
        "favourite": false,
        "firstAddressLine": "lolo 123",
        "firstName": "Kolejny bombolek Bombolada",
        "ice": false,
        "id": "people/c6026900974127078735",
        "note": "",
        "primaryPhoneNumber": "12341234234",
        "secondAddressLine": "123-123",
      },
    ]
  `)
})
