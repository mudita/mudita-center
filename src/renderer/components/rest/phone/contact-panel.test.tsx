import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ContactPanel from "Renderer/components/rest/phone/contact-panel.component"
import { fireEvent } from "@testing-library/dom"
import { ContactPanelTestIdsEnum } from "Renderer/components/rest/phone/contact-panel-test-ids.enum"
import { phoneSeedInput } from "App/seeds/phone"

const defaultProps = {
  onSearchTermChange: jest.fn(),
  onManageButtonClick: jest.fn(),
  onNewButtonClick: jest.fn(),
  resetRows: jest.fn(),
  deleteContacts: jest.fn(),
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
  expect(defaultProps.onSearchTermChange).toBeCalledWith("G")
})

test("selection manager is displayed when there is at least one contact selected", () => {
  const { getByTestId } = renderer({
    selectedContacts: [phoneSeedInput[0]],
  })
  expect(
    getByTestId(ContactPanelTestIdsEnum.SelectionManager)
  ).toBeInTheDocument()
})
