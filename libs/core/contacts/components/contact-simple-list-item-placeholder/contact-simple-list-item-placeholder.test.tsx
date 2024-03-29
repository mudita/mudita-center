/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ContactSimpleListItemPlaceholderProps } from "Core/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder.interface"
import { ContactSimpleListItemPlaceholder } from "Core/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder.component"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { ContactSimpleListItemPlaceholderTestIdsEnum } from "Core/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder-test-ids.enum"

const render = (props: ContactSimpleListItemPlaceholderProps) =>
  renderWithThemeAndIntl(<ContactSimpleListItemPlaceholder {...props} />)

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

describe("Contact with phone number", () => {
  test("Each placeholder exists", () => {
    const { getByTestId } = render({ contact })

    expect(
      getByTestId(ContactSimpleListItemPlaceholderTestIdsEnum.AvatarPlaceholder)
    ).toBeInTheDocument()
    expect(
      getByTestId(ContactSimpleListItemPlaceholderTestIdsEnum.NamePlaceholder)
    ).toBeInTheDocument()
    expect(
      getByTestId(
        ContactSimpleListItemPlaceholderTestIdsEnum.PhoneNumberPlaceholder
      )
    ).toBeInTheDocument()
  })
})

describe("Contact without phone number", () => {
  test("Only avatar and name placeholders exist", () => {
    const { getByTestId, queryByTestId } = render({
      contact: {
        ...contact,
        primaryPhoneNumber: "",
      },
    })

    expect(
      getByTestId(ContactSimpleListItemPlaceholderTestIdsEnum.AvatarPlaceholder)
    ).toBeInTheDocument()
    expect(
      getByTestId(ContactSimpleListItemPlaceholderTestIdsEnum.NamePlaceholder)
    ).toBeInTheDocument()
    expect(
      queryByTestId(
        ContactSimpleListItemPlaceholderTestIdsEnum.PhoneNumberPlaceholder
      )
    ).not.toBeInTheDocument()
  })
})
