import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import React from "react"
import { calendarSeed } from "App/seeds/calendar"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { Provider } from "react-redux"
import store from "Renderer/store"
import CalendarUI from "Renderer/modules/calendar/calendar-ui.component"

const defaultProps = {
  events: calendarSeed.events,
  openSelectVendorModal: jest.fn(),
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <CalendarUI {...props} />
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
