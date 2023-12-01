/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSimpleListItemAvatar } from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.component"
import { ContactSimpleListItemAvatarProps } from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.interface"
import { ContactSimpleListItemAvatarTestIds } from "App/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar-test-ids.enum"
import { Contact } from "App/contacts/dto"
import { AvatarTestIds } from "App/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const render = (props: ContactSimpleListItemAvatarProps) =>
  renderWithThemeAndIntl(<ContactSimpleListItemAvatar {...props} />)

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
    })

    expect(getByTestId(AvatarTestIds.AvatarText)).toHaveTextContent("SB")
    expect(
      getByTestId(ContactSimpleListItemAvatarTestIds.Blocked)
    ).toBeInTheDocument()
    expect(getByText("Sławomir Borewicz")).toBeInTheDocument()
  })

  test("Renders contact information without blocked icon if `blocked` field is equal to `false`", () => {
    const { queryByTestId } = render({
      contact: {
        ...contact,
        blocked: false,
      },
    })

    expect(
      queryByTestId(ContactSimpleListItemAvatarTestIds.Blocked)
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
    })

    expect(queryByTestId(AvatarTestIds.AvatarText)).not.toBeInTheDocument()
    expect(
      queryByText("[value] module.contacts.listUnnamedContact")
    ).toBeInTheDocument()
    expect(queryByText("Sławomir")).not.toBeInTheDocument()
    expect(queryByText("Borewicz")).not.toBeInTheDocument()
  })
})
