import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import SelectCalendarsModal, {
  SelectCalendarsModalProps,
} from "Renderer/components/rest/calendar/select-calendars-modal.component"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/react"

const primaryCalendar = mockedCalendars.find((calendar) => calendar.primary)
const nonPrimaryCalendarIndex = mockedCalendars.findIndex(
  (calendar) => !calendar.primary
)

const renderModal = ({
  onSynchronize,
}: Partial<SelectCalendarsModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <SelectCalendarsModal
      calendars={mockedCalendars}
      onSynchronize={onSynchronize || noop}
    />
  )
  return {
    ...outcome,
    synchronizeButton: () => outcome.getByTestId("modal-action-button"),
    selectInput: () => outcome.getByRole("textbox"),
  }
}

test("select calendar modal renders properly", () => {
  const { synchronizeButton, selectInput } = renderModal()

  expect(synchronizeButton()).toHaveTextContent(
    "[value] view.name.calendar.modal.selectCalendars.button"
  )
  expect(selectInput()).toBeInTheDocument()
})

test("primary calendar is selected by default", () => {
  const { selectInput } = renderModal()

  expect(selectInput()).toHaveValue(primaryCalendar?.id)
})

test("primary calendar is returned by default when clicking synchronize button", () => {
  const onSynchronize = jest.fn()
  const { synchronizeButton } = renderModal({
    onSynchronize,
  })

  fireEvent.click(synchronizeButton())
  expect(onSynchronize).toBeCalledWith(primaryCalendar)
})

test("selected calendar is returned when clicking synchronize button", () => {
  const onSynchronize = jest.fn()
  const { selectInput, synchronizeButton, container } = renderModal({
    onSynchronize,
  })
  const selectListItems = container.querySelectorAll("ul li")

  fireEvent.focus(selectInput())
  expect(selectListItems).toHaveLength(mockedCalendars.length)

  fireEvent.click(selectListItems[nonPrimaryCalendarIndex])
  fireEvent.click(synchronizeButton())
  expect(onSynchronize).toBeCalledWith(mockedCalendars[nonPrimaryCalendarIndex])
})
