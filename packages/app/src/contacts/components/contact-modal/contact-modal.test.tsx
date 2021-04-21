/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactModal, {
  ContactModalProps,
} from "App/contacts/components/contact-modal/contact-modal.component"
import {
  mockEvent,
  mockJpg,
} from "Renderer/components/core/input-file/input-file.test"
import { intl } from "Renderer/utils/intl"
import { ContactSupportFailed } from "App/contacts/components/contact-modal/contact-modal-failed.component"
import { ContactSupportSuccess } from "App/contacts/components/contact-modal/contact-modal-success.component"
import { screen, fireEvent, waitFor } from "@testing-library/react"
// import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const logText = "Some example log text"

const renderContactModal = ({ ...props }: Partial<ContactModalProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<ContactModal open log={logText} {...props} />)
  return {
    ...outcome,
    form: () => outcome.container.querySelector("form"),
    getEmailInput: () => screen.getByPlaceholderText("[value] component.modal.support.form.email.placeholder"),
    getMessageInput: () => screen.getByPlaceholderText("[value] component.modal.support.form.message.placeholder"),
    getFileInput: () => screen.getByLabelText("[value] form.field.multipleFileUpload.description"),
    getDetailsField: () => screen.getByText(logText),
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
    const { getDetailsField } = renderContactModal()

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
        screen.getByText(
          intl.formatMessage({
            id: `component.supportModalFormDetails${
              toggled ? "HideButton" : "ShowButton"
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

  fireEvent.change(getEmailInput() as Element, {
    target: { value: "example@mudita.com" },
  })
  fireEvent.change(getMessageInput() as Element, {
    target: { value: "Example message" },
  })
  fireEvent.change(getFileInput() as Element, mockEvent(file))
  fireEvent.click(getByTestId("modal-action-button"))

  await waitFor(() => {
    expect(onSend).toBeCalledWith({
      email: "example@mudita.com",
      message: "Example message",
      attachments: [file],
    })
  })
})

test("contact modal email validation works properly", async () => {
  const onSend = jest.fn()
  const { getEmailInput, getByTestId } = renderContactModal({
    onSend,
  })

  fireEvent.change(getEmailInput() as Element, {
    target: { value: "wrongEmail" },
  })
  fireEvent.click(getByTestId("modal-action-button"))

  await waitFor(() => {
    expect(onSend).not.toBeCalled()
  })
})

test("contact modal form validation works properly", async () => {
  const onSend = jest.fn()
  const { getByTestId } = renderContactModal({
    onSend,
  })

  fireEvent.click(getByTestId("modal-action-button"))

  await waitFor(() => {
    expect(onSend).toBeCalled()
  })
})

test("failed modal renders properly", () => {
  const { getByText } = renderWithThemeAndIntl(<ContactSupportFailed open />)

  expect(
    getByText("component.supportModalFailTitle", { exact: false })
  ).toBeInTheDocument()
  expect(
    getByText("component.supportModalFailBody", { exact: false })
  ).toBeInTheDocument()
})

test("success modal renders properly", () => {
  const { getByText } = renderWithThemeAndIntl(<ContactSupportSuccess open />)

  expect(
    getByText("component.supportModalSuccessTitle", { exact: false })
  ).toBeInTheDocument()
  expect(
    getByText("component.supportModalSuccessBody", { exact: false })
  ).toBeInTheDocument()
})
