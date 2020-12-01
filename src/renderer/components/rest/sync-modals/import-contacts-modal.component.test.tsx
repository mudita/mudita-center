import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ImportContactsModal, {
  ImportContactsModalProps,
} from "Renderer/components/rest/sync-modals/import-contacts-modal.component"
import { ImportContactsModalTestIds } from "Renderer/components/rest/sync-modals/import-contacts-modal.types"

const renderer = (props: ImportContactsModalProps) => {
  return renderWithThemeAndIntl(<ImportContactsModal {...props} />)
}

test("contacts are displayed properly", () => {
  const { getAllByTestId } = renderer({
    contacts: [
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
    ],
  })
  const rows = getAllByTestId(ImportContactsModalTestIds.Row)

  expect(rows).toHaveLength(3)
  expect(rows[0]).toHaveTextContent("John Doe")
  expect(rows[1]).toHaveTextContent("Jane Doe")
  expect(rows[1]).toHaveTextContent("+1 234 567 890")
  expect(rows[2]).toHaveTextContent("Smith")
  expect(rows[2]).toHaveTextContent("+ 2 345 678 901")
})
