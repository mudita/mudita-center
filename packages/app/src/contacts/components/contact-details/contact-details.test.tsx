/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"
import { Contact } from "App/contacts/reducers"

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
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  ice: false,
  favourite: false,
  blocked: true,
  firstAddressLine: "",
  secondAddressLine: "",
}

const noAddress = "[value] module.contacts.noAddress"

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<ContactDetails {...defaultProps} {...props} />)
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
    expect(onExport).toBeCalledWith([contactBasic])
  })
})
