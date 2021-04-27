/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import { noop } from "Renderer/utils/noop"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"

const contactRich = {
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

const contactBasic = {
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
const noEmail = "[value] module.contacts.noEmail"
const noNotes = "[value] module.contacts.noNotes"

const renderer = (props: {}) => {
  const defaultProps = {
    onUnblock: noop,
    onBlock: noop,
    onCall: noop,
    onDelete: noop,
    onEdit: noop,
    onExport: noop,
    onForward: noop,
    onMessage: noop,
    isThreadOpened: () => false,
  }

  return renderWithThemeAndIntl(<ContactDetails {...defaultProps} {...props} />)
}

test("contact with ICE displays ICE icon", () => {
  const { getByTestId } = renderer({ contact: contactRich })
  expect(getByTestId("icon-Ice")).toBeInTheDocument()
})

test("contact with out ICE displays no ICE info", () => {
  const { queryByTestId } = renderer({ contact: contactBasic })
  expect(queryByTestId("icon-Ice")).not.toBeInTheDocument()
})

test("contact with address displays the address", () => {
  const { getByText } = renderer({ contact: contactRich })
  expect(getByText(contactRich.firstAddressLine)).toBeInTheDocument()
})

test("contact without address displays no address info", () => {
  const { getByText } = renderer({ contact: contactBasic })
  expect(getByText(noAddress)).toBeInTheDocument()
})

test("contact with email displays the email", () => {
  const { getByText } = renderer({ contact: contactRich })
  expect(getByText(contactRich.email)).toBeInTheDocument()
})

test("contact without email displays no email info", () => {
  const { getByText } = renderer({ contact: contactBasic })
  expect(getByText(noEmail)).toBeInTheDocument()
})

test("contact with note displays the note", () => {
  const { getByText } = renderer({ contact: contactRich })
  expect(getByText(contactRich.note)).toBeInTheDocument()
})

test("contact without note displays no note info", () => {
  const { getByText } = renderer({ contact: contactBasic })
  expect(getByText(noNotes)).toBeInTheDocument()
})

test("export button performs export action", () => {
  const onExport = jest.fn()
  const { getByTestId } = renderer({ contact: contactBasic, onExport })
  getByTestId(ContactDetailsTestIds.ExportButton).click()
  expect(onExport).toBeCalledWith([contactBasic])
})
