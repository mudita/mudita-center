/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent } from "@testing-library/dom"
import { ContactSimpleListItemContactSelectionTestIdsEnum } from "App/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection-test-ids.enum"
import { ContactSimpleListItemContactSelection } from "App/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection.component"
import { ContactSimpleListItemContactSelectionProps } from "App/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const render = (props: ContactSimpleListItemContactSelectionProps) =>
  renderWithThemeAndIntl(<ContactSimpleListItemContactSelection {...props} />)

const onContactSelect = jest.fn()
const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "+1 433 323 23 33",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: true,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

describe("Contact with incomplete number", () => {
  test("Renders contact with `primaryPhoneNumber` only, if `secondaryPhoneNumber` haven't provided", () => {
    const { getByTestId, queryByText } = render({
      contact: {
        ...contact,
        secondaryPhoneNumber: "",
      },
      onContactSelect,
    })

    expect(
      getByTestId(
        ContactSimpleListItemContactSelectionTestIdsEnum.PhoneNumbersColumn
      )
    ).toHaveTextContent("+71 195 069 214")
    expect(queryByText("+1 433 323 23 33")).not.toBeInTheDocument()
  })

  test("Renders contact with `secondaryPhoneNumber` only, if `primaryPhoneNumber` haven't provided", () => {
    const { getByTestId, queryByText } = render({
      contact: {
        ...contact,
        primaryPhoneNumber: "",
      },
      onContactSelect,
    })

    expect(
      getByTestId(
        ContactSimpleListItemContactSelectionTestIdsEnum.PhoneNumbersColumn
      )
    ).toHaveTextContent("+1 433 323 23 33")
    expect(queryByText("+71 195 069 214")).not.toBeInTheDocument()
  })

  test("Renders contact with empty numbers if `primaryPhoneNumber` and `secondaryPhoneNumber` haven't provided", () => {
    const { queryByText } = render({
      contact: {
        ...contact,
        primaryPhoneNumber: "",
        secondaryPhoneNumber: "",
      },
      onContactSelect,
    })

    expect(queryByText("+71 195 069 214")).not.toBeInTheDocument()
    expect(queryByText("+1 433 323 23 33")).not.toBeInTheDocument()
  })
})

describe("Action: onSelect", () => {
  test("Calls `onSelect` method when user clicks on element", () => {
    const { getByTestId } = render({
      contact,
      onContactSelect,
    })

    const nameArea = getByTestId(
      ContactSimpleListItemContactSelectionTestIdsEnum.NameWrapperColumn
    )
    const phoneNumberArea = getByTestId(
      ContactSimpleListItemContactSelectionTestIdsEnum.PhoneNumbersColumn
    )

    expect(onContactSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(nameArea)

    expect(onContactSelect).toHaveBeenCalledTimes(1)

    fireEvent.click(phoneNumberArea)

    expect(onContactSelect).toHaveBeenCalledTimes(2)
    expect(onContactSelect).toHaveBeenLastCalledWith(contact)
  })
})
