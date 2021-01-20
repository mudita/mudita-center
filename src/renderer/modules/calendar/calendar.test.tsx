import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import React from "react"
import { calendarSeed } from "App/seeds/calendar"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { Provider } from "react-redux"
import store from "Renderer/store"
import Calendar from "Renderer/modules/calendar/calendar.component"
import { mockedCalendars } from "App/__mocks__/calendars-list"

const defaultProps = {
  events: calendarSeed.events,
  calendars: mockedCalendars,
  loadCalendars: jest.fn(),
  loadEvents: jest.fn(),
  _devClearAllEvents: jest.fn(),
  setEvents: jest.fn(),
}

jest.mock("react-virtualized", () => {
  const ReactVirtualized = jest.requireActual("react-virtualized")
  return {
    ...ReactVirtualized,
    AutoSizer: ({ children }: any) => children({ height: 1000, width: 1000 }),
  }
})

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <Calendar {...props} />
      </Provider>
    </Router>
  )
}

test("renders correct amount of events", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId(CalendarTestIds.Event)).toHaveLength(
    calendarSeed.events.length
  )
})

test("empty state renders when there is no events available", () => {
  const { getByTestId } = renderer({ events: [] })
  expect(getByTestId(CalendarTestIds.NoEvents)).toBeInTheDocument()
})
