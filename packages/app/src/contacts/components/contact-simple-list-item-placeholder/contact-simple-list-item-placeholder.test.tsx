/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ContactSimpleListItemPlaceholder } from "App/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder.component"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { ContactSimpleListItemPlaceholderTestIdsEnum } from "App/contacts/components/contact-simple-list-item-placeholder/contact-simple-list-item-placeholder-test-ids.enum"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { PhoneNumbersState } from "App/messages/reducers"

type Props = ComponentProps<typeof ContactSimpleListItemPlaceholder>

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumberId: "1",
  secondaryPhoneNumberId: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const defaultProps: Props = {
  contact,
}

const defaultState = {
  phoneNumbers: {
    numbers: {
      "1": {
        id: "1",
        number: "+71 195 069 214",
      },
    },
  } as unknown as PhoneNumbersState,
} as unknown as ReduxRootState

const render = (
  extraProps?: Partial<Props>,
  extraState?: Partial<ReduxRootState>
) => {
  const storeMock = createMockStore([thunk])({
    ...defaultState,
    ...extraState,
  })

  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <ContactSimpleListItemPlaceholder {...props} />
    </Provider>
  )
}

describe("Contact with phone number", () => {
  test("Each placeholder exists", () => {
    const { getByTestId } = render()

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
        primaryPhoneNumberId: "",
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
