import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import React from "react"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"
import { InputSearchTestIds } from "Renderer/components/core/input-search/input-search-test-ids.enum"

const defaultProps = {
  onAddEventClick: jest.fn(),
  onSynchroniseClick: jest.fn(),
  onSearchTermChange: jest.fn(),
  onEventSelect: jest.fn(),
  onEventValueChange: jest.fn(),
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

test("search by selection in input search works", () => {
  const onEventSelect = jest.fn()
  const { getByTestId, getAllByTestId } = renderer({ onEventSelect })

  const input = getByTestId(InputSearchTestIds.InputText)
  fireEvent.change(input, {
    target: { value: defaultProps.events[1].name.substr(0, 3) },
  })

  const listItems = getAllByTestId(InputSearchTestIds.ListItem)
  fireEvent.mouseDown(listItems[0])
  expect(onEventSelect).toBeCalledWith(defaultProps.events[1])
  expect(listItems).toHaveLength(1)
})

test("search by value in input search works", () => {
  const onEventValueChange = jest.fn()
  const { getByTestId } = renderer({ onEventValueChange })

  const input = getByTestId(InputSearchTestIds.InputText)
  const value = defaultProps.events[1].name.substr(0, 3)
  fireEvent.change(input, {
    target: { value },
  })

  expect(onEventValueChange).toBeCalledWith(value)
})

test("synchronising is performed after clicking button", () => {
  const { getByText } = renderer()
  const synchroniseButton = getByText(
    "[value] view.name.calendar.panel.synchroniseButton"
  )
  synchroniseButton.click()
  expect(defaultProps.onSynchroniseClick).toBeCalled()
})

test("add event is performed after clicking button", () => {
  const { getByText } = renderer()
  const addEventButton = getByText(
    "[value] view.name.calendar.panel.addEventButton"
  )
  addEventButton.click()
  expect(defaultProps.onAddEventClick).toBeCalled()
})
