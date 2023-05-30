/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { fireEvent } from "@testing-library/dom"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ContactSimpleListItemContactSelectionTestIdsEnum } from "App/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection-test-ids.enum"
import { ContactSimpleListItemContactSelection } from "App/contacts/components/contact-simple-list-item-contact-selection/contact-simple-list-item-contact-selection.component"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { PhoneNumbersState } from "App/messages/reducers"

type Props = ComponentProps<typeof ContactSimpleListItemContactSelection>

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumberId: "1",
  secondaryPhoneNumberId: "2",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: true,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const defaultProps: Props = {
  contact,
  onContactSelect: jest.fn(),
}

const defaultState = {
  phoneNumbers: {
    numbers: {
      "1": {
        id: "1",
        number: "+71 195 069 214",
      },
      "2": {
        id: "2",
        number: "+1 433 323 23 33",
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
      <ContactSimpleListItemContactSelection {...props} />
    </Provider>
  )
}

describe("Contact with incomplete number", () => {
  test("Renders contact with `primaryPhoneNumber` only, if `secondaryPhoneNumber` haven't provided", () => {
    const { getByTestId, queryByText } = render({
      contact: {
        ...contact,
        secondaryPhoneNumber: "",
      },
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
      }
    })

    expect(queryByText("+71 195 069 214")).not.toBeInTheDocument()
    expect(queryByText("+1 433 323 23 33")).not.toBeInTheDocument()
  })
})

describe("Action: onSelect", () => {
  test("Calls `onSelect` method when user clicks on element", () => {
    const { getByTestId } = render({
      contact,
    })

    const nameArea = getByTestId(
      ContactSimpleListItemContactSelectionTestIdsEnum.NameWrapperColumn
    )
    const phoneNumberArea = getByTestId(
      ContactSimpleListItemContactSelectionTestIdsEnum.PhoneNumbersColumn
    )

    expect(defaultProps.onContactSelect).toHaveBeenCalledTimes(0)

    fireEvent.click(nameArea)

    expect(defaultProps.onContactSelect).toHaveBeenCalledTimes(1)

    fireEvent.click(phoneNumberArea)

    expect(defaultProps.onContactSelect).toHaveBeenCalledTimes(2)
    expect(defaultProps.onContactSelect).toHaveBeenLastCalledWith(contact)
  })
})
