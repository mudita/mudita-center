import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactEdit from "App/contacts/components/contact-edit/contact-edit.component"
import { contactsSeed } from "App/seeds/contacts"
import { noop } from "Renderer/utils/noop"

const renderer = (extraProps?: {}) => {
  const defaultProps = {
    onCancel: noop,
    onSpeedDialSettingsOpen: noop,
    onSave: noop,
  }
  return renderWithThemeAndIntl(
    // @ts-ignore
    <ContactEdit
      contact={contactsSeed.db[0]}
      {...defaultProps}
      {...extraProps}
    />
  )
}

test("cancel is called", () => {
  const cancelButtonText = "[value] view.name.phone.contacts.edit.cancel"
  const onCancel = jest.fn()
  const { getByText } = renderer({ onCancel })
  const cancelButton = getByText(cancelButtonText)
  cancelButton.click()
  expect(onCancel).toHaveBeenCalled()
})
