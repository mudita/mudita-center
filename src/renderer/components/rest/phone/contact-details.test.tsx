import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactDetails from "Renderer/components/rest/phone/contact-details.component"
import { noop } from "Renderer/utils/noop"

const contactWithIce = {
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
const contactWithOutIce = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "Lavina_Bartoletti@yahoo.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: true,
  firstAddressLine: "3284 Klocko Plains",
  secondAddressLine: "",
}

const renderer = (withIce: boolean) => {
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
      contact={withIce ? contactWithIce : contactWithOutIce}
      {...defaultProps}
    />
  )
}

test("contact with ice", () => {
  const { getByTestId } = renderer(true)
  expect(getByTestId("icon-Ice")).toBeInTheDocument()
})

test("contact with out ice", () => {
  const { queryByTestId } = renderer(false)
  expect(queryByTestId("icon-Ice")).not.toBeInTheDocument()
})
