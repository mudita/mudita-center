import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactModal, {
  ContactModalProps,
} from "Renderer/components/core/contact-modal/contact-modal.component"
import { fireEvent } from "@testing-library/dom"
import { mockJpg } from "Renderer/components/core/input-file/input-file.test"
import { intl } from "Renderer/utils/intl"
import "jest-styled-components"

const renderContactModal = ({ ...props }: Partial<ContactModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<ContactModal {...props} />)
  return {
    ...outcome,
    getEmailInput: () => outcome.container.querySelector("input[type='text']"),
    getMessageInput: () => outcome.container.querySelector("textarea"),
    getFileInput: () => outcome.container.querySelector("input[type='file']"),
    getDetailsField: () => outcome.container.querySelector("pre"),
  }
}

test("contact modal form renders properly", () => {
  const {
    getEmailInput,
    getMessageInput,
    getFileInput,
    getDetailsField,
  } = renderContactModal()

  expect(getEmailInput()).toBeInTheDocument()
  expect(getMessageInput()).toBeInTheDocument()
  expect(getFileInput()).toBeInTheDocument()
  expect(getDetailsField()).toBeInTheDocument()
})

test("contact modal details toggles properly", () => {
  const { getDetailsField, getByText } = renderContactModal()

  const testDetailsField = (expanded = false) => {
    expect(getDetailsField()).toHaveStyleRule(
      "max-height",
      expanded ? "8rem" : "4rem"
    )
    expect(getDetailsField()).toHaveStyleRule(
      "overflow",
      expanded ? "auto" : "hidden"
    )
  }

  const clickToggleButton = (toggled = false) => {
    fireEvent.click(
      getByText(
        intl.formatMessage({
          id: `component.modal.support.form.details.${
            toggled ? "hideButton" : "showButton"
          }`,
        })
      )
    )
  }

  testDetailsField()
  clickToggleButton()
  testDetailsField(true)
  clickToggleButton(true)
  testDetailsField()
})

test("contact modal form sending works properly", () => {
  const onSend = jest.fn()
  const {
    getEmailInput,
    getMessageInput,
    getFileInput,
    getByTestId,
  } = renderContactModal({
    onSend,
  })

  const file = mockJpg("screenshot1")

  fireEvent.change(getEmailInput() as Element, {
    target: { value: "email@example.com" },
  })
  fireEvent.change(getMessageInput() as Element, {
    target: { value: "Example message" },
  })
  fireEvent.change(getFileInput() as Element, {
    target: {
      files: [file],
    },
  })

  fireEvent.click(getByTestId("modal-action-button"))

  expect(onSend).toBeCalledWith({
    email: "email@example.com",
    message: "Example message",
    attachments: [file],
  })
})
