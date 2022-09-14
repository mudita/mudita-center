/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ContactPanel from "App/contacts/components/contact-panel/contact-panel.component"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { Contact } from "App/contacts/reducers/contacts.interface"

type Props = ComponentProps<typeof ContactPanel>

const contacts: Contact[] = [
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
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
]

const defaultProps: Props = {
  contactsList: contacts,
  editMode: false,
  searchValue: "",
  results: contacts,
  allItemsSelected: false,
  onManageButtonClick: jest.fn(),
  onNewButtonClick: jest.fn(),
  toggleAll: jest.fn(),
  resetRows: jest.fn(),
  selectedContacts: [],
  deleteContacts: jest.fn(),
  onContactSelect: jest.fn(),
  onSearchValueChange: jest.fn(),
  onExport: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<ContactPanel {...props} />)
}

describe("`ContactPanel` component", () => {
  test("selection manager is displayed when there is at least one contact selected", () => {
    const { getByTestId } = render({
      selectedContacts: [contacts[0].id],
    })
    expect(
      getByTestId(ContactPanelTestIdsEnum.SelectionManager)
    ).toBeInTheDocument()
  })

  test("new contact button is blocked while in editing mode", () => {
    const { getByTestId } = render({
      editMode: true,
    })
    expect(getByTestId(ContactPanelTestIdsEnum.NewButton)).toBeDisabled()
  })

  test("In search results view, contactPanel should render search results title", () => {
    const { getByTestId } = render({
      showSearchResults: true,
      searchValue: "test",
    })
    expect(getByTestId(ContactPanelTestIdsEnum.SearchTitle)).toHaveTextContent(
      "[value] module.contacts.searchResultsTitle"
    )
  })
  test("import and new contact buttons are hidden when there is at least one contact selected", () => {
    const { queryByTestId } = render({
      selectedContacts: [contacts[0].id],
    })
    expect(
      queryByTestId(ContactPanelTestIdsEnum.ImportButton)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(ContactPanelTestIdsEnum.NewButton)
    ).not.toBeInTheDocument()
  })
})
