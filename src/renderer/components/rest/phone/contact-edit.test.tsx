import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactEdit from "Renderer/components/rest/phone/contact-edit.component"
import { data } from "App/seeds/phone"

const renderer = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <ContactEdit contact={data[0]} {...extraProps} />
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
