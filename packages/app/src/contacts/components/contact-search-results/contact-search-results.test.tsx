/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactSearchResults from "App/contacts/components/contact-search-results/contact-search-results.component"
import { ContactSearchResultsTestIdsEnum } from "App/contacts/components/contact-search-results/contact-search-results-test-ids.enum"
import { Contact, ResultsState } from "App/contacts/reducers/contacts.interface"

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

type Props = ComponentProps<typeof ContactSearchResults>

const defaultProps: Props = {
  results: [],
  getRowStatus: jest
    .fn()
    .mockReturnValue({ indeterminate: false, selected: false }),
  noneRowsSelected: false,
  onBlock: jest.fn(),
  onDelete: jest.fn(),
  onExport: jest.fn(),
  onForward: jest.fn(),
  onSelect: jest.fn(),
  onUnblock: jest.fn(),
  toggleRow: jest.fn(),
  selectedContact: null,
  resultsState: ResultsState.Empty,
}

const contact: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71195069214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: false,
  favourite: false,
  blocked: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ContactSearchResults {...props} />)
}

test("No results should be render as a default state", () => {
  const { queryByTestId } = render()
  expect(
    queryByTestId(ContactSearchResultsTestIdsEnum.Empty)
  ).toBeInTheDocument()
})

test("Loading component is rendered if resultState is Loading", () => {
  const { queryByTestId } = render({ resultsState: ResultsState.Loading })
  expect(
    queryByTestId(ContactSearchResultsTestIdsEnum.Loading)
  ).toBeInTheDocument()
})

test("No results is rendered if resultState is Loaded and contactList is empty", () => {
  const { queryByTestId } = render({ resultsState: ResultsState.Loaded })
  expect(
    queryByTestId(ContactSearchResultsTestIdsEnum.Empty)
  ).toBeInTheDocument()
})

test("Results list is rendered if resultState is Loaded and results isn't empty", () => {
  const { queryByTestId } = render({
    resultsState: ResultsState.Loaded,
    results: [contact, contact],
  })
  expect(
    queryByTestId(ContactSearchResultsTestIdsEnum.Table)?.childNodes
  ).toHaveLength(2)
})
