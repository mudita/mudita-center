/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import React from "react"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { InputSelectTestIds } from "Renderer/components/core/input-select/input-select.component"
import { CalendarPanelTestIds } from "Renderer/components/rest/calendar/calendar-panel-test-ids.enum"

const defaultProps = {
  onAddEventClick: jest.fn(),
  onSynchroniseClick: jest.fn(),
  onEventSelect: jest.fn(),
  resetRows: jest.fn(),
  selectedEvents: [],
  events: [
    {
      id: "test-event-1",
      name: "Meeting",
      startDate: new Date("2020-01-01 11:00").toISOString(),
      endDate: new Date("2020-01-01 14:00").toISOString(),
    },
    {
      id: "test-event-2",
      name: "Felix's Birthday",
      startDate: new Date("2020-01-02 11:00").toISOString(),
      endDate: new Date("2020-01-02 14:00").toISOString(),
    },
  ] as CalendarEvent[],
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<CalendarPanel {...props} />)
  return {
    ...outcome,
    selectInput: () => outcome.getByRole("searchbox"),
    selectList: () => outcome.queryByTestId(InputSelectTestIds.List),
    selectListItems: () =>
      outcome.queryAllByTestId(InputSelectTestIds.ListItem),
  }
}

test("search input dropdown shows after writing at least 3 chars", () => {
  const { selectInput, selectList } = renderer()

  selectInput().focus()

  for (let i = 0; i < 4; i++) {
    const value = defaultProps.events[0].name.substr(0, i)
    fireEvent.change(selectInput(), {
      target: { value },
    })
    if (i < 3) {
      expect(selectList()).not.toBeInTheDocument()
    } else {
      expect(selectList()).toBeInTheDocument()
      expect(selectList()).toBeVisible()
    }
  }
})

test("clicking on searched option returns given item properly", () => {
  const onEventSelect = jest.fn()
  const { selectInput, selectListItems } = renderer({ onEventSelect })

  fireEvent.focus(selectInput())
  fireEvent.change(selectInput(), {
    target: { value: defaultProps.events[1].name.substr(0, 3) },
  })
  fireEvent.click(selectListItems()[0])
  expect(onEventSelect).toBeCalledWith(defaultProps.events[1])
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

test("selection manager is displayed when there is at least one event selected ", () => {
  const { getByTestId } = renderer({ selectedEvents: [defaultProps.events[0]] })
  expect(getByTestId(CalendarPanelTestIds.SelectionManager)).toBeInTheDocument()
})
