import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import { noop } from "Renderer/utils/noop"

const contactRich = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "milicjant@buziaczek.pl",
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

const noAddress = "[value] view.name.phone.contacts.details.noAddress"
const noEmail = "[value] view.name.phone.contacts.details.noEmail"
const noNotes = "[value] view.name.phone.contacts.details.noNotes"

const renderer = (props: { rich: boolean }) => {
  const defaultProps = {
    onUnblock: noop,
    onBlock: noop,
    onCall: noop,
    onDelete: noop,
    onEdit: noop,
    onExport: noop,
    onForward: noop,
    onMessage: noop,
    isTopicThreadOpened: () => false,
  }

  return renderWithThemeAndIntl(
    <ContactDetails
      contact={props.rich ? contactRich : contactBasic}
      {...defaultProps}
    />
  )
}

test("contact with ICE displays ICE icon", () => {
  const { getByTestId } = renderer({ rich: true })
  expect(getByTestId("icon-Ice")).toBeInTheDocument()
})

test("contact with out ICE displays no ICE info", () => {
  const { queryByTestId } = renderer({ rich: false })
  expect(queryByTestId("icon-Ice")).not.toBeInTheDocument()
})

test("contact with address displays the address", () => {
  const { getByText } = renderer({ rich: true })
  expect(getByText(contactRich.firstAddressLine)).toBeInTheDocument()
})

test("contact without address displays no address info", () => {
  const { getByText } = renderer({ rich: false })
  expect(getByText(noAddress)).toBeInTheDocument()
})

test("contact with email displays the email", () => {
  const { getByText } = renderer({ rich: true })
  expect(getByText(contactRich.email)).toBeInTheDocument()
})

test("contact without email displays no email info", () => {
  const { getByText } = renderer({ rich: false })
  expect(getByText(noEmail)).toBeInTheDocument()
})

test("contact with note displays the note", () => {
  const { getByText } = renderer({ rich: true })
  expect(getByText(contactRich.note)).toBeInTheDocument()
})

test("contact without note displays no note info", () => {
  const { getByText } = renderer({ rich: false })
  expect(getByText(noNotes)).toBeInTheDocument()
})
