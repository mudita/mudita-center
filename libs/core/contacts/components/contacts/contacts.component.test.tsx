/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-empty-function */

import React, { ComponentProps } from "react"
import { waitFor, fireEvent } from "@testing-library/dom"
import { VirtuosoMockContext } from "react-virtuoso"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { IntlProvider } from "react-intl"
import Contacts from "Core/contacts/components/contacts/contacts.component"
import { ContactDetailsTestIds } from "Core/contacts/components/contact-details/contact-details-test-ids.enum"
import { InputSearchTestIds } from "Core/__deprecated__/renderer/components/core/input-search/input-search.component"
import { ContactInputSelectTestIds } from "Core/contacts/components/contact-input-search/contact-input-select-test-ids.enum"
import { Contact, ResultState } from "Core/contacts/reducers/contacts.interface"
import { ExportContactFailedModalTestIds } from "Core/contacts/components/export-contact-failed-modal/export-contact-failed-modal-test-ids.component"
import { ExportContactsResult } from "Core/contacts/constants"
import { VirtualizedContactListItemTestIds } from "Core/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item-test-ids"
import { ContactSearchResultsTestIdsEnum } from "../contact-search-results/contact-search-results-test-ids.enum"
import store from "Core/__deprecated__/renderer/store"
import theme from "Core/core/styles/theming/theme"
import translationConfig from "App/translations.config.json"
import localeEn from "Core/__deprecated__/renderer/locales/default/en-US.json"
import extractLanguageKeys from "Core/__deprecated__/renderer/utils/extract-test-locale"

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

type Props = ComponentProps<typeof Contacts>

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("@electron/remote", () => ({
  Menu: () => ({
    popup: jest.fn(),
    append: jest.fn(),
  }),
  MenuItem: () => jest.fn(),
}))

jest.mock("react-router", () => ({
  useLocation: () => ({
    search: "",
  }),
}))

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

const testLocale = extractLanguageKeys(localeEn)

const contactOne: Contact = {
  id: "0",
  firstName: "Sławomir",
  lastName: "Borewicz",
  primaryPhoneNumber: "+71 195 069 214",
  secondaryPhoneNumber: "",
  email: "example@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  firstAddressLine: "Malczewskiego 3, Warszawa",
  secondAddressLine: "",
}

const contactTwo: Contact = {
  id: "1",
  firstName: "Luke",
  lastName: "Skywalker",
  primaryPhoneNumber: "+48 123 123 123",
  secondaryPhoneNumber: "",
  email: "example+1@mudita.com",
  note: "sapiente rem dignissimos sunt",
  ice: true,
  favourite: false,
  firstAddressLine: "Jasna 3, Coruscant",
  secondAddressLine: "",
}

const contactsData: Contact[] = [
  {
    id: "0",
    firstName: "Sławomir",
    lastName: "Borewicz",
    primaryPhoneNumber: "+71195069214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "+62761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    secondaryPhoneNumber: "761294266",
    email: "oswald.bednar@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "Bednarów 3",
  },
  {
    id: "6e3810c8-c917",
    firstName: "Oswald",
    lastName: "Bednar",
  },
]

const defaultProps: Props = {
  getContact: (id: string) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [contactOne, contactTwo].find((contact) => contact.id === id)!
  },
  allItemsSelected: false,
  exportContacts: jest.fn(),
  addNewContact: jest.fn(),
  importContact: jest.fn(),
  authorize: jest.fn(),
  deleteContacts: jest.fn(),
  editContact: jest.fn(),
  loadContacts: jest.fn(),
  addNewContactsToState: jest.fn(),
  isThreadOpened: jest.fn(),
  onCall: jest.fn(),
  onManageButtonClick: jest.fn(),
  onMessage: jest.fn(),
  onSpeedDialSettingsSave: jest.fn(),
  setProviderData: jest.fn(),
  onEdit: jest.fn(),
  onForward: jest.fn(),
  onDelete: jest.fn(),
  resultState: ResultState.Loaded,
  speedDialChosenList: [],
  contactList: [
    {
      category: "S",
      contacts: [contactOne, contactTwo],
    },
  ],
  contacts: [],
  selectedItems: [],
  allRowsSelected: false,
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  toggleItem: jest.fn(),
  closeImportWindow: jest.fn(),
  getPaths: jest.fn(),
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return render(
    <ThemeProvider theme={theme}>
      <IntlProvider
        defaultLocale={translationConfig.defaultLanguage}
        locale={translationConfig.defaultLanguage}
        messages={process.env.NODE_ENV === "test" ? testLocale : localeEn}
      >
        <VirtuosoMockContext.Provider
          value={{ viewportHeight: 300, itemHeight: 5 }}
        >
          <Provider store={store}>
            <Contacts {...props} />
          </Provider>
        </VirtuosoMockContext.Provider>
      </IntlProvider>
    </ThemeProvider>
  )
}

test("changing contact details preview, when the user switching between contacts", async () => {
  const { getAllByTestId, getByTestId } = renderer()

  fireEvent.click(
    getAllByTestId(VirtualizedContactListItemTestIds.ContactRow)[0]
  )

  await waitFor(() => {
    expect(getByTestId(ContactDetailsTestIds.PrimaryPhoneInput)).toHaveValue(
      contactOne.primaryPhoneNumber
    )
    expect(getByTestId(ContactDetailsTestIds.Name)).toHaveTextContent(
      [contactOne.firstName, contactOne.lastName].join(" ")
    )
    expect(getByTestId(ContactDetailsTestIds.AddressDetails)).toHaveTextContent(
      contactOne.firstAddressLine ?? ""
    )
  })

  fireEvent.click(
    getAllByTestId(VirtualizedContactListItemTestIds.ContactRow)[1]
  )

  await waitFor(() => {
    expect(getByTestId(ContactDetailsTestIds.PrimaryPhoneInput)).toHaveValue(
      contactTwo.primaryPhoneNumber
    )
    expect(getByTestId(ContactDetailsTestIds.Name)).toHaveTextContent(
      [contactTwo.firstName, contactTwo.lastName].join(" ")
    )
    expect(getByTestId(ContactDetailsTestIds.AddressDetails)).toHaveTextContent(
      contactTwo.firstAddressLine ?? ""
    )
  })
})

test("first name and second name in search shows correct result", () => {
  const { queryByTestId, getByTestId } = renderer({ contacts: contactsData })
  const input = queryByTestId(
    ContactInputSelectTestIds.Input
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: "Oswald Bednar" } })
  expect(getByTestId(InputSearchTestIds.List).childNodes).toHaveLength(3)
})

describe("contact export", () => {
  test("Export failed modal is visible if export failed", async () => {
    const mockedExportContacts = jest
      .fn()
      .mockReturnValue(ExportContactsResult.Failed)
    const { queryByTestId, findAllByTestId } = renderer({
      exportContacts: mockedExportContacts,
    })

    await waitFor(async () => {
      fireEvent.click(
        (
          await findAllByTestId(
            VirtualizedContactListItemTestIds.ContactRowDropdownToggler
          )
        )[0]
      )
    })

    const moreButton = (await findAllByTestId("icon-More"))[0]
    const toggler = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactRowDropdownToggler
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(toggler)
    })
    await waitFor(() => {
      fireEvent.click(moreButton)
    })
    const exportButton = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactExportButton
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(exportButton)
    })
    expect(mockedExportContacts).toHaveBeenCalledTimes(1)
    expect(
      queryByTestId(ExportContactFailedModalTestIds.Description)
    ).toBeInTheDocument()
  })

  test("successful export resets all items", async () => {
    const mockedExportContacts = jest
      .fn()
      .mockReturnValue(ExportContactsResult.Ok)
    const mockedResetAllItems = jest.fn()
    const { queryByTestId, findAllByTestId } = renderer({
      exportContacts: mockedExportContacts,
      resetAllItems: mockedResetAllItems,
    })

    await waitFor(async () => {
      fireEvent.click(
        (
          await findAllByTestId(
            VirtualizedContactListItemTestIds.ContactRowDropdownToggler
          )
        )[0]
      )
    })

    const moreButton = (await findAllByTestId("icon-More"))[0]
    const toggler = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactRowDropdownToggler
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(toggler)
    })
    await waitFor(() => {
      fireEvent.click(moreButton)
    })
    const exportButton = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactExportButton
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(exportButton)
    })
    await waitFor(() => {
      expect(mockedExportContacts).toHaveBeenCalledTimes(1)
      expect(mockedResetAllItems).toHaveBeenCalledTimes(1)
      expect(
        queryByTestId(ExportContactFailedModalTestIds.Description)
      ).not.toBeInTheDocument()
    })
  })

  test("Export failed modal is not shown if export is cancelled", async () => {
    const mockedExportContacts = jest
      .fn()
      .mockReturnValue(ExportContactsResult.Cancelled)
    const { queryByTestId, findAllByTestId } = renderer({
      exportContacts: mockedExportContacts,
    })

    await waitFor(async () => {
      fireEvent.click(
        (
          await findAllByTestId(
            VirtualizedContactListItemTestIds.ContactRowDropdownToggler
          )
        )[0]
      )
    })

    const moreButton = (await findAllByTestId("icon-More"))[0]
    const toggler = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactRowDropdownToggler
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(toggler)
    })
    await waitFor(() => {
      fireEvent.click(moreButton)
    })
    const exportButton = (
      await findAllByTestId(
        VirtualizedContactListItemTestIds.ContactExportButton
      )
    )[0]
    await waitFor(() => {
      fireEvent.click(exportButton)
    })

    await waitFor(() => {
      expect(mockedExportContacts).toHaveBeenCalledTimes(1)
    })

    const desc = queryByTestId(ExportContactFailedModalTestIds.Description)
    await waitFor(() => {
      expect(desc).not.toBeInTheDocument()
    })
  })
})

describe("search preview", () => {
  test("preview list should be independent of search results", async () => {
    const { findByTestId, findAllByTestId } = renderer({
      contacts: [contactOne, contactTwo],
    })
    const input = (await findByTestId(
      ContactInputSelectTestIds.Input
    )) as HTMLInputElement
    fireEvent.change(input, { target: { value: "Luke Skywalker" } })

    expect(
      await findAllByTestId(VirtualizedContactListItemTestIds.ContactRow)
    ).toHaveLength(2)

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    })

    expect(
      (await findByTestId(ContactSearchResultsTestIdsEnum.Table)).childNodes
    ).toHaveLength(1)

    fireEvent.change(input, { target: { value: "S" } })

    expect(
      (await findByTestId(ContactSearchResultsTestIdsEnum.Table)).childNodes
    ).toHaveLength(1)

    expect(await findAllByTestId(InputSearchTestIds.ListItem)).toHaveLength(2)
  })
})
