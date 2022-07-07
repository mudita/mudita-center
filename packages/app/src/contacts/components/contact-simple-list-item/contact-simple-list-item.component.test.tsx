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

const onContactSelect = jest.fn()
const onPhoneNumberSelect = jest.fn()
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
      onContactSelect,
    })

    expect(getByTestId(AvatarTestIds.AvatarText)).toHaveTextContent("SB")
    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.Blocked)
    ).toBeInTheDocument()
    expect(getByText("Sławomir Borewicz")).toBeInTheDocument()
    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.ContactSelectableColumn)
    ).toHaveTextContent("+71 195 069 214 +1 433 323 23 33")
  })

  test("Renders contact information without blocked icon if `blocked` field is equal to `false`", () => {
    const { queryByTestId } = render({
      contact: {
        ...contact,
        blocked: false,
      },
      onContactSelect,
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
      onContactSelect,
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
      onContactSelect,
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
      onContactSelect,
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
      onContactSelect,
    })

    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.ContactSelectableColumn)
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
      getByTestId(ContactSimpleListItemTestIdsEnum.ContactSelectableColumn)
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

describe("when onContactSelect is defined", () => {
  test("clicking on any element of the row call calls onContactSelect", () => {
    const { getByTestId } = render({
      contact,
      onContactSelect,
    })

    const nameArea = getByTestId(
      ContactSimpleListItemTestIdsEnum.NameWrapperColumn
    )
    const phoneNumberArea = getByTestId(
      ContactSimpleListItemTestIdsEnum.ContactSelectableColumn
    )

    expect(onContactSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(nameArea)

    expect(onContactSelect).toHaveBeenCalledTimes(1)

    fireEvent.click(phoneNumberArea)

    expect(onContactSelect).toHaveBeenCalledTimes(2)
    expect(onContactSelect).toHaveBeenLastCalledWith(contact)
  })

  test("clickable column with the full column name is displayed", () => {
    const { getByTestId } = render({
      contact,
      onContactSelect,
    })

    expect(
      getByTestId(ContactSimpleListItemTestIdsEnum.ContactSelectableColumn)
    ).toBeInTheDocument()
  })
  test("columns with clickable phone number is not defined", () => {
    const { queryByTestId } = render({
      contact,
      onContactSelect,
    })

    expect(
      queryByTestId(
        ContactSimpleListItemTestIdsEnum.PrimaryPhoneNumberSelectableColumn
      )
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(
        ContactSimpleListItemTestIdsEnum.SecondaryPhoneNumberSelectableColumn
      )
    ).not.toBeInTheDocument()
  })
})

describe("when onPhoneNumberSelect is defined", () => {
  test("clickable column with the full column name is not displayed", () => {
    const { queryByTestId } = render({
      contact,
      onPhoneNumberSelect,
    })

    expect(
      queryByTestId(ContactSimpleListItemTestIdsEnum.ContactSelectableColumn)
    ).not.toBeInTheDocument()
  })

  describe("when primary phone number is assigned to contact", () => {
    test("clickable field with primary phone number is displayed", () => {
      const { queryByTestId, queryByText } = render({
        contact: {
          ...contact,
          primaryPhoneNumber: "123 456 777",
        },
        onPhoneNumberSelect,
      })

      expect(
        queryByTestId(
          ContactSimpleListItemTestIdsEnum.PrimaryPhoneNumberSelectableColumn
        )
      ).toBeInTheDocument()

      expect(queryByText("123 456 777")).toBeInTheDocument()
    })
  })
  describe("when secondary phone number is assigned to contact", () => {
    test("clickable field with secondary phone number is displayed", () => {
      const { queryByTestId, queryByText } = render({
        contact: {
          ...contact,
          secondaryPhoneNumber: "222 456 666",
        },
        onPhoneNumberSelect,
      })

      expect(
        queryByTestId(
          ContactSimpleListItemTestIdsEnum.PrimaryPhoneNumberSelectableColumn
        )
      ).toBeInTheDocument()

      expect(queryByText("222 456 666")).toBeInTheDocument()
    })
  })
})

describe("when both onPhoneNumberSelect and onContactSelect are defined", () => {
  test("the exception is raised", () => {
    try {
      render({
        contact,
        onContactSelect,
        onPhoneNumberSelect,
      })
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: You should define only one of the properties: onContactSelect or onPhoneNumberSelect]`
      )
    }

    expect.assertions(1)
  })
})
describe("when both onPhoneNumberSelect and onContactSelect are not defined", () => {
  test("the exception is raised", () => {
    try {
      render({
        contact,
      })
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: You should define one of the properties: onContactSelect or onPhoneNumberSelect]`
      )
    }

    expect.assertions(1)
  })
})
