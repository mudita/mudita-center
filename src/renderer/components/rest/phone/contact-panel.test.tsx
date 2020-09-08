import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactPanel from "Renderer/components/rest/phone/contact-panel.component"
import { fireEvent } from "@testing-library/dom"
import { ContactPanelTestIdsEnum } from "Renderer/components/rest/phone/contact-panel-test-ids.enum"

const defaultProps = {
  onSearchTermChange: jest.fn(),
  onManageButtonClick: jest.fn(),
  onNewButtonClick: jest.fn(),
  resetRows: jest.fn(),
  selectedContacts: [],
}

const renderer = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <ContactPanel {...defaultProps} {...extraProps} />
  )
}

test("search works", () => {
  const { getByRole } = renderer()
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, { target: { value: "G" } })
  expect(defaultProps.onSearchTermChange).toBeCalled()
})

test("selection manager is displayed when there is at least one contact selected", () => {
  const { getByTestId } = renderer({
    selectedContacts: [
      {
        id: "f5b8b756-62fb-4580-a101-2c4b1aa27c0b",
        firstName: "Anya",
        lastName: "VonRueden",
        secondaryPhoneNumber: "+83489610269",
        note: "fugiat qui",
        ice: true,
        favourite: true,
        speedDial: 3,
      },
    ],
  })
  expect(
    getByTestId(ContactPanelTestIdsEnum.SelectionManager)
  ).toBeInTheDocument()
})
