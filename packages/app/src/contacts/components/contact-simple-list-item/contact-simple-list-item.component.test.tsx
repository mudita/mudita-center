/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ContactSimpleListItemProps } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.interface"
import { ContactSimpleListItem } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item.component"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { ContactSimpleListItemTestIdsEnum } from "App/contacts/components/contact-simple-list-item/contact-simple-list-item-test-ids.enum"
import { AvatarTestIds } from "App/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"

const render = (props: ContactSimpleListItemProps) =>
  renderWithThemeAndIntl(<ContactSimpleListItem {...props} />)

const onSelect = jest.fn()
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

describe("Contact with complete data", () => {
  test("Renders contact information with blocked icon if `blocked` field is equal to `true`", () => {
    const { getByTestId, getByText } = render({
      contact,
      onSelect,
    })

    expect(getByTestId(AvatarTestIds.AvatarText)).toHaveTextContent("SB")
    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.Blocked)
    ).toBeInTheDocument()
    expect(getByText("Sławomir Borewicz")).toBeInTheDocument()
    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.PhoneNumber)
    ).toHaveTextContent("+71 195 069 214 +1 433 323 23 33")
  })

  test("Renders contact information without blocked icon if `blocked` field is equal to `false`", () => {
    const { queryByTestId } = render({
      contact: {
        ...contact,
        blocked: false,
      },
      onSelect,
    })

    expect(
      queryByTestId(ContactSimpleListItemTestIdsEnum.Blocked)
    ).not.toBeInTheDocument()
  })
})

describe("Contact with incomplete name", () => {
  test("Renders contact with `firstName` only if `lastName` haven't provided", () => {
    const { getByTestId, getByText } = render({
      contact: {
        ...contact,
        lastName: "",
      },
      onSelect,
    })

    expect(getByTestId(AvatarTestIds.AvatarText)).toHaveTextContent("S")
    expect(getByText("Sławomir")).toBeInTheDocument()
  })

  test("Renders contact with `lastName` only if `firstName` haven't provided", () => {
    const { getByTestId, getByText } = render({
      contact: {
        ...contact,
        firstName: "",
      },
      onSelect,
    })

    expect(getByTestId(AvatarTestIds.AvatarText)).toHaveTextContent("B")
    expect(getByText("Borewicz")).toBeInTheDocument()
  })

  test("Renders contact with empty name if `firstName` and `lastName` haven't provided", () => {
    const { queryByTestId, queryByText } = render({
      contact: {
        ...contact,
        firstName: "",
        lastName: "",
      },
      onSelect,
    })

    expect(queryByTestId(AvatarTestIds.AvatarText)).not.toBeInTheDocument()
    expect(
      queryByText("[value] module.contacts.listUnnamedContact")
    ).toBeInTheDocument()
    expect(queryByText("Sławomir")).not.toBeInTheDocument()
    expect(queryByText("Borewicz")).not.toBeInTheDocument()
  })
})

describe("Contact with incomplete number", () => {
  test("Renders contact with `primaryPhoneNumber` only, if `secondaryPhoneNumber` haven't provided", () => {
    const { getByTestId, queryByText } = render({
      contact: {
        ...contact,
        secondaryPhoneNumber: "",
      },
      onSelect,
    })

    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.PhoneNumber)
    ).toHaveTextContent("+71 195 069 214")
    expect(queryByText("+1 433 323 23 33")).not.toBeInTheDocument()
  })

  test("Renders contact with `secondaryPhoneNumber` only, if `primaryPhoneNumber` haven't provided", () => {
    const { getByTestId, queryByText } = render({
      contact: {
        ...contact,
        primaryPhoneNumber: "",
      },
      onSelect,
    })

    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.PhoneNumber)
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
      onSelect,
    })

    expect(queryByText("+71 195 069 214")).not.toBeInTheDocument()
    expect(queryByText("+1 433 323 23 33")).not.toBeInTheDocument()
  })
})

describe("Action: onSelect", () => {
  test("Calls `onSelect` method when user clicks on element", () => {
    const { getByTestId } = render({
      contact,
      onSelect,
    })

    const nameArea = getByTestId(ContactSimpleListItemTestIdsEnum.NameWrapper)
    const phoneNumberArea = getByTestId(
      ContactSimpleListItemTestIdsEnum.PhoneNumber
    )

    expect(onSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(nameArea)

    expect(onSelect).toHaveBeenCalledTimes(1)

    fireEvent.click(phoneNumberArea)

    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenLastCalledWith(contact)
  })
})
