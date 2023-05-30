/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import { Contact } from "App/contacts/reducers"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { PhoneNumbersState } from "App/messages/reducers"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"

type Props = ComponentProps<typeof ContactDetails>

const defaultProps: Props = {
  onUnblock: jest.fn(),
  onBlock: jest.fn(),
  onCall: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onExport: jest.fn(),
  onForward: jest.fn(),
  onMessage: jest.fn(),
  onClose: jest.fn(),
  isThreadOpened: () => false,
}

const contactRich: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const contactBasic: Contact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "",
  lastName: "",
  primaryPhoneNumberId: "1",
  secondaryPhoneNumberId: "",
  email: "",
  note: "",
  ice: false,
  favourite: false,
  blocked: true,
  firstAddressLine: "",
  secondAddressLine: "",
}

const noAddress = "[value] module.contacts.noAddress"

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

beforeEach(() => {
  jest.clearAllMocks()
})

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
      <ContactDetails {...defaultProps} {...props} />
    </Provider>
  )
}

describe("`ContactDetails` component", () => {
  test("contact with address displays the address", () => {
    const { getByText } = render({ contact: contactRich })
    expect(getByText(contactRich.firstAddressLine ?? "")).toBeInTheDocument()
  })

  test("contact without address displays no address info", () => {
    const { getByText } = render({ contact: contactBasic })
    expect(getByText(noAddress)).toBeInTheDocument()
  })

  test("export button performs export action", () => {
    const onExport = jest.fn()
    const { getByTestId } = render({ contact: contactBasic, onExport })
    getByTestId(ContactDetailsTestIds.ExportButton).click()
    expect(onExport).toBeCalledWith([contactBasic.id])
  })
})
