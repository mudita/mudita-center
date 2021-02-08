import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ImportEventsModal from "App/calendar/components/import-events-modal/import-events-modal.component"
import { eventsData } from "App/seeds/calendar"
import { ImportEventsModalTestIds } from "App/calendar/components/import-events-modal/import-events-modal-test-ids.enum"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const renderer = (props = {}) =>
  renderWithThemeAndIntl(<ImportEventsModal events={eventsData} {...props} />)

test("table renders correct amount of rows", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(ImportEventsModalTestIds.Row)).toHaveLength(
    eventsData.length
  )
})

test("action button has correct text", () => {
  const { getByTestId } = renderer({ onActionButtonClick: jest.fn() })
  expect(getByTestId(ModalTestIds.ModalActionButton)).toHaveTextContent(
    "[value] view.generic.button.ok"
  )
})
