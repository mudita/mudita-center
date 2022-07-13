/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// import { fireEvent } from "@testing-library/react"
import { fireEvent, screen } from "@testing-library/react"
import { ContactSimpleListPhoneSelectionItemTestIdsEnum } from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection-test-ids.enum"
import { ContactSimpleItemListPhoneSelection } from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.component"
import { ContactSimpleItemListPhoneSelectionProps } from "App/contacts/components/contact-simple-list-item-phone-selection/contact-simple-list-item-phone-selection.interface"
import { Contact } from "App/contacts/dto"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"

const renderer = (props: ContactSimpleItemListPhoneSelectionProps) => {
  return renderWithThemeAndIntl(
    <ContactSimpleItemListPhoneSelection {...props} />
  )
}

const expectedHoverColor = "#f4f5f6"

const onPhoneNumberSelect = jest.fn()
const contactWithBothPhoneNumbers: Contact = {
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
const contactOnlyWithPrimaryPhone: Contact = {
  ...contactWithBothPhoneNumbers,
  firstName: "Adam",
  lastName: "Nowak",
  secondaryPhoneNumber: undefined,
}
const contactOnlyWithSecondaryPhone: Contact = {
  ...contactWithBothPhoneNumbers,
  firstName: "Pan",
  lastName: "Makłowicz",
  primaryPhoneNumber: undefined,
}

test("Avatar Col is rendered", () => {
  const { getByTestId } = renderer({
    contact: contactWithBothPhoneNumbers,
    onPhoneNumberSelect,
  })

  expect(
    getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
  ).toBeInTheDocument()
})

describe("when contact only has primary number defined", () => {
  test("field with primary number is displayed", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactOnlyWithPrimaryPhone,
      },
      onPhoneNumberSelect,
    })

    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
      )
    ).toBeInTheDocument()
  })

  test("field with secondary number is not displayed", () => {
    const { queryByTestId } = renderer({
      contact: {
        ...contactOnlyWithPrimaryPhone,
      },
      onPhoneNumberSelect,
    })

    expect(
      queryByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
      )
    ).not.toBeInTheDocument()
  })

  test("hovering over the avatar column changes the background color of primary number field and avatar column", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactOnlyWithPrimaryPhone,
      },
      onPhoneNumberSelect,
    })

    fireEvent.mouseOver(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    )
    expect(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
      )
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
  })
})

describe("when contact only has secondary number defined", () => {
  test("field with primary number is not displayed", () => {
    const { queryByTestId } = renderer({
      contact: {
        ...contactOnlyWithSecondaryPhone,
      },
      onPhoneNumberSelect,
    })

    expect(
      queryByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
      )
    ).not.toBeInTheDocument()
  })

  test("field with secondary number is displayed", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactOnlyWithSecondaryPhone,
      },
      onPhoneNumberSelect,
    })

    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
      )
    ).toBeInTheDocument()
  })

  test("hovering over the avatar column changes the background color of secondary number field and avatar column", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactOnlyWithSecondaryPhone,
      },
      onPhoneNumberSelect,
    })

    fireEvent.mouseOver(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    )
    expect(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
      )
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
  })
})

describe("when contact has both primary and secondary phone number defined", () => {
  test("both primary number and secondary number are displayed", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactWithBothPhoneNumbers,
      },
      onPhoneNumberSelect,
    })

    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
      )
    ).toBeInTheDocument()

    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
      )
    ).toBeInTheDocument()
  })

  test("hovering over the avatar column changes the background color of primary number field", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactWithBothPhoneNumbers,
      },
      onPhoneNumberSelect,
    })

    fireEvent.mouseOver(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    )
    expect(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.PrimaryPhoneField
      )
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
  })
  test("hovering over the avatar column does not change the background color of secondary number field", () => {
    const { getByTestId } = renderer({
      contact: {
        ...contactWithBothPhoneNumbers,
      },
      onPhoneNumberSelect,
    })

    fireEvent.mouseOver(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    )
    expect(
      getByTestId(ContactSimpleListPhoneSelectionItemTestIdsEnum.AvatarColumn)
    ).toHaveStyle(`background-color: ${expectedHoverColor};`)
    expect(
      getByTestId(
        ContactSimpleListPhoneSelectionItemTestIdsEnum.SecondaryPhoneField
      )
    ).not.toHaveStyle(`background-color: ${expectedHoverColor};`)
  })
})
