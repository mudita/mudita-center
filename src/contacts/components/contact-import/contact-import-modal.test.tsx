import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactImportModal, {
  ModalType,
} from "App/contacts/components/contact-import/contact-import-modal.component"
import { noop } from "Renderer/utils/noop"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { ContactImportModalTestIds } from "App/contacts/components/contact-import/contact-import-modal-test-ids.enum"

const contacts = [
  {
    id: "0",
    firstName: "John",
    lastName: "Doe",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "johndoe@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Baker street 221, London",
    secondAddressLine: "",
  },
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "milicjant@buziaczek.pl",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "Lavina_Bartoletti@yahoo.com",
    note: "sapiente rem dignissimos sunt",
    ice: true,
    favourite: false,
    blocked: true,
    firstAddressLine: "3284 Klocko Plains",
    secondAddressLine: "",
  },
  {
    id: "a664baed-09be-4698-b9ea-69849986b055",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    email: "Crystel_Prosacco@yahoo.com",
    note: "voluptatem expedita vel",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "55727 Kelly Expressway",
    secondAddressLine: "",
  },
  {
    id: "40a66803-5a7a-4ee0-bc46-154412d86532",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+67 558 173 266",
    email: "",
    note: "ipsum numquam fugiat",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Estevanburgh",
  },
  {
    id: "026630e7-31b7-4e49-8590-b527cfb98e31",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "+57 523 983 615",
    email: "",
    note: "dolorem",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "",
    secondAddressLine: "Lake Lonie",
  },
  {
    id: "7173eddd-a533-4f1d-a09d-f1fec74d29f9",
    firstName: "",
    lastName: "",
    primaryPhoneNumber: "+85 102 096 521",
    secondaryPhoneNumber: "+04 349 051 883",
    email: "Jennifer87@gmail.com",
    note: "sequi recusandae eveniet",
    ice: true,
    favourite: false,
    blocked: false,
    firstAddressLine: "36324 Norval Flat",
    secondAddressLine: "",
  },
]

const renderer = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <ContactImportModal
      contacts={contacts}
      onActionButtonClick={noop}
      modalType={ModalType.Select}
      {...extraProps}
    />
  )
}

test("action button is disabled when none of the checkboxes are selected", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(ModalTestIds.ModalActionButton)).not.toBeDisabled()
  getByTestId(ContactImportModalTestIds.ToggleAllCheckbox).click()
  expect(getByTestId(ModalTestIds.ModalActionButton)).toBeDisabled()
})

test("action button is called with correct payload", () => {
  const onActionButtonClick = jest.fn()
  const { getByTestId } = renderer({ onActionButtonClick })
  getByTestId(ModalTestIds.ModalActionButton).click()
  expect(onActionButtonClick).toBeCalledWith(contacts)
})

test("correct amount of rows is rendered", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(ContactImportModalTestIds.ContactRow)).toHaveLength(
    contacts.length
  )
})

test("all checkboxes are initially checked", () => {
  const { container } = renderer()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked())
})

test("toggle all checkbox can uncheck remaining checkboxes", () => {
  const { getByTestId, container } = renderer()
  const toggleAllCheckbox = getByTestId(
    ContactImportModalTestIds.ToggleAllCheckbox
  )
  expect(toggleAllCheckbox).toBeChecked()
  toggleAllCheckbox.click()
  const checkboxes = container.querySelectorAll('[type="checkbox"]')
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked())
})

test("only failed rows are checked when failure is detected", () => {
  const { getAllByTestId } = renderer({
    modalType: ModalType.Fail,
    failedItemIndex: 3,
  })
  getAllByTestId(ContactImportModalTestIds.RowCheckbox).forEach(
    (checkbox, index) => {
      if (index < 3) {
        expect(checkbox).not.toBeChecked()
      } else {
        expect(checkbox).toBeChecked()
      }
    }
  )
})

test("only failed rows has a proper icon attached", () => {
  const { getAllByTestId } = renderer({
    modalType: ModalType.Fail,
    failedItemIndex: 3,
  })
  getAllByTestId(ContactImportModalTestIds.ContactRow).forEach((row, index) => {
    if (index < 3) {
      expect(
        row.querySelector('[data-testid="icon-FailRed"]')
      ).not.toBeInTheDocument()
    } else {
      expect(
        row.querySelector('[data-testid="icon-FailRed"]')
      ).toBeInTheDocument()
    }
  })
})
