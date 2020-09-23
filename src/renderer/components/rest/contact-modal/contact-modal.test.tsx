import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactModal, {
  ContactModalProps,
} from "Renderer/components/rest/contact-modal/contact-modal.component"
import {
  mockEvent,
  mockJpg,
} from "Renderer/components/core/input-file/input-file.test"
import { intl } from "Renderer/utils/intl"
import { ContactSupportFailed } from "Renderer/components/rest/contact-modal/contact-modal-failed.component"
import { ContactSupportSuccess } from "Renderer/components/rest/contact-modal/contact-modal-success.component"
import { fireEvent, act } from "@testing-library/react"

const renderContactModal = ({ ...props }: Partial<ContactModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<ContactModal {...props} />)
  return {
    ...outcome,
    form: () => outcome.container.querySelector("form"),
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

describe("contact modal details", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 80,
    })
  })

  test("toggles properly", () => {
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
})

test("contact modal form sending works properly", async () => {
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

  await act(async () => {
    fireEvent.change(getEmailInput() as Element, {
      target: { value: "email@example.com" },
    })
    fireEvent.change(getMessageInput() as Element, {
      target: { value: "Example message" },
    })
    fireEvent.change(getFileInput() as Element, mockEvent(file))
  })

  await act(async () => {
    fireEvent.click(getByTestId("modal-action-button"))
  })

  expect(onSend).toBeCalledWith({
    email: "email@example.com",
    message: "Example message",
    attachments: [file],
  })
})

test("contact modal email validation works properly", async () => {
  const onSend = jest.fn()
  const { getEmailInput, getByTestId } = renderContactModal({
    onSend,
  })

  await act(async () => {
    fireEvent.change(getEmailInput() as Element, {
      target: { value: "wrongEmail" },
    })

    fireEvent.click(getByTestId("modal-action-button"))
  })

  expect(onSend).not.toBeCalled()
})

test("contact modal form validation works properly", async () => {
  const onSend = jest.fn()
  const { getByTestId } = renderContactModal({
    onSend,
  })

  await act(async () => {
    fireEvent.click(getByTestId("modal-action-button"))
  })

  expect(onSend).not.toBeCalled()
})

test("failed modal renders properly", () => {
  const { getByText } = renderWithThemeAndIntl(<ContactSupportFailed />)

  expect(
    getByText("component.modal.support.fail.title", { exact: false })
  ).toBeInTheDocument()
  expect(
    getByText("component.modal.support.fail.body", { exact: false })
  ).toBeInTheDocument()
})

test("success modal renders properly", () => {
  const { getByText } = renderWithThemeAndIntl(<ContactSupportSuccess />)

  expect(
    getByText("component.modal.support.success.title", { exact: false })
  ).toBeInTheDocument()
  expect(
    getByText("component.modal.support.success.body", { exact: false })
  ).toBeInTheDocument()
})
