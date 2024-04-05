/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ContactSimpleListItemAvatar } from "Core/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.component"
import { ContactSimpleListItemAvatarProps } from "Core/contacts/components/contact-simple-list-item-avatar/contact-simple-list-item-avatar.interface"
import { Contact } from "Core/contacts/dto"
import { AvatarTestIds } from "Core/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"

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
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

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
