import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactPanel from "App/contacts/components/contact-panel/contact-panel.component"
import { fireEvent } from "@testing-library/dom"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { Contact } from "App/contacts/store/contacts.type"
import { InputSelectTestIds } from "Renderer/components/core/input-select/input-select.component"

const defaultProps = {
  onContactSelect: jest.fn(),
  onManageButtonClick: jest.fn(),
  onNewButtonClick: jest.fn(),
  resetRows: jest.fn(),
  deleteContacts: jest.fn(),
  selectedContacts: [],
  contacts: [
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
      id: "593cbb53-a8e7-48ca-8fa5-e18d525ea1f6",
      firstName: "Edmund",
      lastName: "",
      primaryPhoneNumber: "+46 333 060 911",
      secondaryPhoneNumber: "",
      email: "",
      note: "temporibus molestiae",
      ice: true,
      favourite: false,
      blocked: false,
      firstAddressLine: "016 McClure Curve",
      secondAddressLine: "",
    },
  ] as Contact[],
}

const renderer = (extraProps?: {}) => {
  const outcome = renderWithThemeAndIntl(
    <ContactPanel {...defaultProps} {...extraProps} />
  )
  return {
    ...outcome,
    selectInput: () => outcome.getByRole("searchbox"),
    selectList: () => outcome.queryByTestId(InputSelectTestIds.List),
    selectListItems: () =>
      outcome.queryAllByTestId(InputSelectTestIds.ListItem),
  }
}

test("search input dropdown shows after writing at least 3 chars", () => {
  const { selectInput, selectList } = renderer()

  selectInput().focus()

  for (let i = 0; i < 4; i++) {
    const value = defaultProps.contacts[0].firstName?.substr(0, i)
    fireEvent.change(selectInput(), {
      target: { value },
    })
    if (i < 3) {
      expect(selectList()).not.toBeInTheDocument()
    } else {
      expect(selectList()).toBeInTheDocument()
      expect(selectList()).toBeVisible()
    }
  }
})

test("clicking on searched option returns given item properly", () => {
  const onContactSelect = jest.fn()
  const { selectInput, selectListItems } = renderer({ onContactSelect })

  fireEvent.focus(selectInput())
  fireEvent.change(selectInput(), {
    target: { value: defaultProps.contacts[1].firstName?.substr(0, 3) },
  })
  fireEvent.click(selectListItems()[0])
  expect(onContactSelect).toBeCalledWith(defaultProps.contacts[1])
})

test("selection manager is displayed when there is at least one contact selected", () => {
  const { getByTestId } = renderer({
    selectedContacts: [defaultProps.contacts[0]],
  })
  expect(
    getByTestId(ContactPanelTestIdsEnum.SelectionManager)
  ).toBeInTheDocument()
})
