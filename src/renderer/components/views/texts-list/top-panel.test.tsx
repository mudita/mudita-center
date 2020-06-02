import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import TemplatesPanel, {
  TemplatesTopPanelProps,
} from "Renderer/components/rest/messages/templates/templates-panel.component"
import { noop } from "Renderer/utils/noop"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  searchPlaceholder: {
    id: "view.name.messages.templates.searchPlaceholder",
  },
  selectionsNumber: {
    id: "view.name.messages.templates.selectionsNumber",
  },
  newButton: {
    id: "view.name.messages.templates.newButton",
  },
  deleteButton: {
    id: "view.name.messages.templates.deleteButton",
  },
})

const renderTopPanel = ({
  onSearchTermChange = noop,
  onNewButtonClick = noop,
  onDeleteButtonClick = noop,
  selectedItemsCount = 0,
  allItemsSelected = false,
}: Partial<TemplatesTopPanelProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <TemplatesPanel
      onSearchTermChange={onSearchTermChange}
      onNewButtonClick={onNewButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      selectedItemsCount={selectedItemsCount}
      allItemsSelected={allItemsSelected}
      messages={messages}
    />
  )
  return {
    ...outcome,
    getInput: () => outcome.getByRole("searchbox") as HTMLInputElement,
    getButton: () => outcome.getByRole("button") as HTMLButtonElement,
  }
}

test("renders state for no selected items properly", () => {
  const { getInput, getButton } = renderTopPanel()
  expect(getInput().placeholder).toEqual(
    intl.formatMessage(messages.searchPlaceholder)
  )
  expect(getButton()).toHaveTextContent(intl.formatMessage(messages.newButton))
})

test("renders state for one selected item properly", () => {
  const { getByText } = renderTopPanel({ selectedItemsCount: 1 })
  expect(
    getByText(intl.formatMessage(messages.selectionsNumber, { num: 1 }))
  ).toBeInTheDocument()
})

test("renders state for many selected items properly", () => {
  const { getByText } = renderTopPanel({ selectedItemsCount: 11 })
  expect(
    getByText(intl.formatMessage(messages.selectionsNumber, { num: 11 }))
  ).toBeInTheDocument()
})

test("renders state for all selected items properly", () => {
  const { getByText } = renderTopPanel({
    selectedItemsCount: 11,
    allItemsSelected: true,
  })
  expect(
    getByText(intl.formatMessage(messages.selectionsNumber, { num: -1 }))
  ).toBeInTheDocument()
})
