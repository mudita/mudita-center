import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ImportContactsModal, {
  ImportContactsModalProps,
} from "Renderer/components/rest/sync-modals/import-contacts-modal.component"
import { ImportContactsModalTestIds } from "Renderer/components/rest/sync-modals/import-contacts-modal.types"
import { createFullName } from "Renderer/models/phone/phone.helpers"

const renderer = (props: ImportContactsModalProps) => {
  return renderWithThemeAndIntl(<ImportContactsModal {...props} />)
}

const contacts: ImportContactsModalProps["contacts"] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    primaryPhoneNumber: "+1 234 567 890",
    email: "janedoe@example.com",
  },
  { lastName: "Smith", secondaryPhoneNumber: "+ 2 345 678 901" },
]

test("contacts are displayed properly", () => {
  const { getAllByTestId } = renderer({ contacts })
  const rows = getAllByTestId(ImportContactsModalTestIds.Row)

  expect(rows).toHaveLength(3)
  expect(rows[0]).toHaveTextContent(createFullName(contacts[0]))
  expect(rows[1]).toHaveTextContent(createFullName(contacts[1]))
  expect(rows[1]).toHaveTextContent(contacts[1].primaryPhoneNumber as string)
  expect(rows[2]).toHaveTextContent(createFullName(contacts[2]))
  expect(rows[2]).toHaveTextContent(contacts[2].secondaryPhoneNumber as string)
})
