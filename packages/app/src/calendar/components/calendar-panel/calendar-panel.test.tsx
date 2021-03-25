/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import React from "react"
import CalendarPanel from "App/calendar/components/calendar-panel/calendar-panel.component"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { InputSelectTestIds } from "Renderer/components/core/input-select/input-select.component"
import { CalendarPanelTestIds } from "App/calendar/components/calendar-panel/calendar-panel-test-ids.enum"
import ExportErrorModal from "App/calendar/components/export-error-modal/export-error-modal.component"

const mockedResetRows = jest.fn()
const defaultProps = {
  onAddEventClick: jest.fn(),
  onSynchroniseClick: jest.fn(),
  onEventSelect: jest.fn(),
  resetRows: mockedResetRows,
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

afterEach(() => {
  jest.clearAllMocks()
})

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

test("reset rows is called when export is succeed ", async () => {
  const selectedEvents = [defaultProps.events[0]]
  const exportCalendarEvents = jest.fn(() => true)
  const { getByTestId } = renderer({
    selectedEvents,
    exportCalendarEvents,
  })
  await getByTestId(CalendarPanelTestIds.ExportButton).click()
  expect(mockedResetRows).toHaveBeenCalled()
  expect(exportCalendarEvents).toHaveBeenCalledWith(selectedEvents)
})

test("modal is opened when there is error returned ", async () => {
  const exportCalendarEvents = jest.fn(() => false)
  const selectedEvents = [defaultProps.events[0]]
  const openModal = jest.fn()
  const { getByTestId } = renderer({
    selectedEvents,
    exportCalendarEvents,
    openModal,
  })
  await getByTestId(CalendarPanelTestIds.ExportButton).click()
  expect(mockedResetRows).not.toHaveBeenCalled()
  expect(openModal).toHaveBeenCalledWith(<ExportErrorModal />)
  expect(exportCalendarEvents).toHaveBeenCalledWith(selectedEvents)
})
