/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent, waitFor } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactEdit from "App/contacts/components/contact-edit/contact-edit.component"
import { contactsSeed } from "App/__deprecated__/seeds/contacts"
import { ContactEditTestIdsEnum } from "App/contacts/components/contact-edit/contact-edit-test-ids.enum"
import { noop } from "App/__deprecated__/renderer/utils/noop"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
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

describe("display too long number error", () => {
  test("for primary number", async () => {
    const tooLongMessageError = "[value] component.formErrorTooLong"
    const { getByTestId, getByText } = renderer()
    const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)

    fireEvent.input(primaryNumber, { target: { value: "123123123123123123" } })

    await waitFor(() => {
      expect(getByText(tooLongMessageError)).toBeInTheDocument()
    })
  })

  test("for secondary number", async () => {
    const tooLongMessageError = "[value] component.formErrorTooLong"
    const { getByTestId, getByText } = renderer()
    const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

    fireEvent.input(secondaryNumber, {
      target: { value: "123123123123123123" },
    })

    await waitFor(() => {
      expect(getByText(tooLongMessageError)).toBeInTheDocument()
    })
  })
})

describe("display invalid format error", () => {
  test.each(["@", ",", "£", "§", "~", "`", "'"])(
    "for primary number",
    async (specialCharacter) => {
      const invalidFormatMessageError =
        "[value] component.formErrorNumbersAndSpacesOnly"
      const { getByTestId, queryByText } = renderer()
      const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)
      fireEvent.input(primaryNumber, { target: { value: specialCharacter } })
      await waitFor(() => {
        expect(queryByText(invalidFormatMessageError)).toBeInTheDocument()
      })
    }
  )
  test.each(["@", ",", "£", "§", "~", "`", "'"])(
    "for secondary number",
    async (specialCharacter) => {
      const invalidFormatMessageError =
        "[value] component.formErrorNumbersAndSpacesOnly"
      const { getByTestId, queryByText } = renderer()
      const secondaryNumber = getByTestId(
        ContactEditTestIdsEnum.SecondaryNumber
      )
      fireEvent.input(secondaryNumber, { target: { value: specialCharacter } })
      await waitFor(() => {
        expect(queryByText(invalidFormatMessageError)).toBeInTheDocument()
      })
    }
  )
})

test("Not display unique numbers error for empty numbers", async () => {
  const uniqueNumberError = "[value] component.formErrorNumberUnique"
  const { getByTestId, queryByText } = renderer()
  const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)
  const secondaryNumber = getByTestId(ContactEditTestIdsEnum.SecondaryNumber)

  fireEvent.input(primaryNumber, { target: { value: "" } })
  await waitFor(noop)
  fireEvent.input(secondaryNumber, { target: { value: "" } })

  await waitFor(() => {
    expect(queryByText(uniqueNumberError)).not.toBeInTheDocument()
  })
})

describe("Not display error for phone number regexp match", () => {
  const invalidFormatMessageError =
    "[value] component.formErrorNumbersAndSpacesOnly"
  test.each([" ", "(", ")", "+", "-", ".", "#"])(
    "for primary number should pass as valid when password value contains %s",
    async (specialCharacter) => {
      const { getByTestId, queryByText } = renderer()
      const primaryNumber = getByTestId(ContactEditTestIdsEnum.PrimaryNumber)
      fireEvent.input(primaryNumber, { target: { value: specialCharacter } })
      await waitFor(() => {
        expect(queryByText(invalidFormatMessageError)).not.toBeInTheDocument()
      })
    }
  )
  test.each([" ", "(", ")", "+", "-", ".", "#"])(
    "for secondary number should pass as valid when password value contains %s",
    async (specialCharacter) => {
      const { getByTestId, queryByText } = renderer()
      const secondaryNumber = getByTestId(
        ContactEditTestIdsEnum.SecondaryNumber
      )
      fireEvent.input(secondaryNumber, { target: { value: specialCharacter } })
      await waitFor(() => {
        expect(queryByText(invalidFormatMessageError)).not.toBeInTheDocument()
      })
    }
  )
})
