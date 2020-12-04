import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactImportModal from "Renderer/components/rest/phone/contact-import-modal.component"
import { phoneSeedInput } from "App/seeds/phone"
import { noop } from "Renderer/utils/noop"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { ContactImportModalTestIds } from "Renderer/components/rest/phone/contact-import-modal-test-ids.enum"

const renderer = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <ContactImportModal
      contacts={phoneSeedInput}
      onActionButtonClick={noop}
      {...extraProps}
    />
  )
}

test("action button is disabled when none of the checkboxes are selected", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ModalTestIds.ModalActionButton)).not.toBeDisabled()
  getByTestId(ContactImportModalTestIds.ToggleAllCheckbox).click()
  expect(getByTestId(ModalTestIds.ModalActionButton)).toBeDisabled()
})

test("action button is called with correct payload", () => {
  const onActionButtonClick = jest.fn()
  const { getByTestId } = renderer({ onActionButtonClick })
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(onActionButtonClick).toBeCalledWith(phoneSeedInput)
})

test("correct amount of rows is rendered", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(ContactImportModalTestIds.ContactRow)).toHaveLength(phoneSeedInput.length)
})

test("all checkboxes are initially checked", () => {
  const { container } = renderer()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach(checkbox => expect(checkbox).toBeChecked())
})

test("toggle all checkbox can uncheck remaining checkboxes", () => {
  const { getByTestId, container } = renderer()
  const toggleAllCheckbox = getByTestId(ContactImportModalTestIds.ToggleAllCheckbox)
  expect(toggleAllCheckbox).toBeChecked()
  toggleAllCheckbox.click()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach(checkbox => expect(checkbox).not.toBeChecked())
})
