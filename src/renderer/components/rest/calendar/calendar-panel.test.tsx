import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import React from "react"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"

const defaultProps = {
  onAddEventClick: jest.fn(),
  onSynchroniseClick: jest.fn(),
  onSearchTermChange: jest.fn(),
  onEventSelect: jest.fn(),
  events: [
    {
      id: "test-event-1",
      name: "Birthday",
      date: [new Date("2020-01-01 11:00"), new Date("2020-01-01 14:00")],
    },
    {
      id: "test-event-2",
      name: "Felix's Birthday 2",
      date: [new Date("2020-01-02 11:00"), new Date("2020-01-02 14:00")],
    },
  ] as CalendarEvent[],
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<CalendarPanel {...props} />)
}

test("search in input select works", () => {
  const onEventSelect = jest.fn()
  const { container, getByRole } = renderer({ onEventSelect })

  const searchInput = getByRole("textbox")
  fireEvent.change(searchInput, { target: { value: "Fel" } })

  const listItems = container.querySelectorAll("ul li")
  fireEvent.click(listItems[0])
  expect(onEventSelect).toBeCalledWith(defaultProps.events[1])
  expect(listItems).toHaveLength(1)
})

test("synchronising is performed after clicking button", () => {
  const { getByText } = renderer()
  const synchroniseButton = getByText(
    "[value] view.name.calendar.panel.synchroniseButton"
  )
  synchroniseButton.click()
  expect(defaultProps.onSynchroniseClick).toBeCalled()
})

test("add event is performed after clicking button ", () => {
  const { getByText } = renderer()
  const addEventButton = getByText(
    "[value] view.name.calendar.panel.addEventButton"
  )
  addEventButton.click()
  expect(defaultProps.onAddEventClick).toBeCalled()
})
