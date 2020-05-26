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
    emailInput: () => outcome.container.querySelector("input[type='text']"),
    messageInput: () => outcome.container.querySelector("textarea"),
    fileInput: () => outcome.container.querySelector("input[type='file']"),
    detailsField: () => outcome.container.querySelector("pre"),
  }
}

test("contact modal form renders properly", () => {
  const {
    emailInput,
    messageInput,
    fileInput,
    detailsField,
  } = renderContactModal()

  expect(emailInput()).toBeInTheDocument()
  expect(messageInput()).toBeInTheDocument()
  expect(fileInput()).toBeInTheDocument()
  expect(detailsField()).toBeInTheDocument()
})

test("contact modal details toggles properly", () => {
  const { detailsField, getByText } = renderContactModal()

  const testDetailsField = (expanded = false) => {
    expect(detailsField()).toHaveStyleRule(
      "max-height",
      expanded ? "8rem" : "4rem"
    )
    expect(detailsField()).toHaveStyleRule(
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
    emailInput,
    messageInput,
    fileInput,
    getByTestId,
  } = renderContactModal({
    onSend,
  })

  const file = mockJpg("screenshot1")

  fireEvent.change(emailInput() as Element, {
    target: { value: "email@example.com" },
  })
  fireEvent.change(messageInput() as Element, {
    target: { value: "Example message" },
  })
  fireEvent.change(fileInput() as Element, {
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
