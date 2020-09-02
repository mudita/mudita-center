import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactEdit from "Renderer/components/rest/phone/contact-edit.component"
import { phoneSeed } from "App/seeds/phone"
import { noop } from "Renderer/utils/noop"

const renderer = (extraProps?: {}) => {
  const defaultProps = {
    onCancel: noop,
    onSpeedDialSettingsOpen: noop,
    onSave: noop,
  }
  return renderWithThemeAndIntl(
    // @ts-ignore
    <ContactEdit contact={phoneSeed.db[0]} {...defaultProps} {...extraProps} />
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
