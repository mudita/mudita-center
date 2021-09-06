/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent, waitFor } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactEdit from "App/contacts/components/contact-edit/contact-edit.component"
import { contactsSeed } from "App/seeds/contacts"
import { ContactEditTestIdsEnum } from "App/contacts/components/contact-edit/contact-edit-test-ids.enum"
import { noop } from "Renderer/utils/noop"

const renderer = (extraProps?: {}) => {
  const defaultProps = {
    onCancel: noop,
    onSpeedDialSettingsOpen: noop,
    onSave: noop,
  }
  return renderWithThemeAndIntl(
    <ContactEdit
      contact={contactsSeed.db[0]}
      {...defaultProps}
      {...extraProps}
      speedDialChosenList={[0]}
    />
  )
}

test("cancel is called", () => {
  const cancelButtonText = "[value] module.contacts.cancelEdit"
  const onCancel = jest.fn()
  const { getByText } = renderer({ onCancel })
  const cancelButton = getByText(cancelButtonText)
  cancelButton.click()
  expect(onCancel).toHaveBeenCalled()
})

test("display error if user provided the same to primary secondary number", async () => {
  const uniqueMessageError = "[value] component.formErrorNumberUnique"
  const { getByTestId, getByText } = renderer()
  const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)
  const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

  fireEvent.input(primaryNumber, { target: { value: "123123123" } })

  // Ask me "Why?". And I will say "I have no idea"
  await waitFor(noop)

  fireEvent.input(secondaryNumber, { target: { value: "123123123" } })

  await waitFor(() => {
    expect(getByText(uniqueMessageError)).toBeInTheDocument()
  })
})

test("display top level validation error from props", async () => {
  const uniqueMessageError = "[value] component.formErrorNumberUnique"
  const { getByText } = renderer({
    validationError: [
      {
        field: "primaryPhoneNumber",
        error: "component.formErrorNumberUnique",
      },
    ],
  })

  await waitFor(() => {
    expect(getByText(uniqueMessageError)).toBeInTheDocument()
  })
})

test("display too short number error for primary number", async () => {
  const tooShotMessageError = "[value] component.formErrorTooShort"
  const { getByTestId, getByText } = renderer()
  const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)

  fireEvent.input(primaryNumber, { target: { value: "123" } })

  await waitFor(() => {
    expect(getByText(tooShotMessageError)).toBeInTheDocument()
  })
})

test("display too short number error for secondary number", async () => {
  const tooShotMessageError = "[value] component.formErrorTooShort"
  const { getByTestId, getByText } = renderer()
  const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

  fireEvent.input(secondaryNumber, { target: { value: "123" } })

  await waitFor(() => {
    expect(getByText(tooShotMessageError)).toBeInTheDocument()
  })
})

test("display too long number error for primary number", async () => {
  const tooLongMessageError = "[value] component.formErrorTooLong"
  const { getByTestId, getByText } = renderer()
  const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)

  fireEvent.input(primaryNumber, { target: { value: "123123123123123123" } })

  await waitFor(() => {
    expect(getByText(tooLongMessageError)).toBeInTheDocument()
  })
})

test("display too long number error for secondary number", async () => {
  const tooLongMessageError = "[value] component.formErrorTooLong"
  const { getByTestId, getByText } = renderer()
  const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

  fireEvent.input(secondaryNumber, { target: { value: "123123123123123123" } })

  await waitFor(() => {
    expect(getByText(tooLongMessageError)).toBeInTheDocument()
  })
})

test("display invalid format error for primary number", async () => {
  const invalidFormatMessageError =
    "[value] component.formErrorNumbersAndSpacesOnly"
  const { getByTestId, getByText } = renderer()
  const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)

  fireEvent.input(primaryNumber, { target: { value: "+-@.,-£§~`'" } })

  await waitFor(() => {
    expect(getByText(invalidFormatMessageError)).toBeInTheDocument()
  })
})

test("display invalid format error for secondary number", async () => {
  const invalidFormatMessageError =
    "[value] component.formErrorNumbersAndSpacesOnly"
  const { getByTestId, getByText } = renderer()
  const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

  fireEvent.input(secondaryNumber, { target: { value: "+-@.,-£§~`'" } })

  await waitFor(() => {
    expect(getByText(invalidFormatMessageError)).toBeInTheDocument()
  })
})
