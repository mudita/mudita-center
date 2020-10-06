import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Templates, {
  TemplatesProps,
} from "Renderer/modules/messages/tabs/templates.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { mockedTemplateData } from "Renderer/modules/messages/__mocks__/template-modal-data"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"
import { fireEvent } from "@testing-library/dom"
import { SortOrder } from "Common/enums/sort-order.enum"

mockAllIsIntersecting(true)

const renderTemplates = ({
  onDeleteButtonClick = noop,
  onNewButtonClick = noop,
  onSearchTermChange = noop,
  newTemplate = noop,
  templates = mockedTemplateData,
  changeSortOrder = noop,
  sortOrder = SortOrder.Descending,
}: Partial<TemplatesProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Templates
      newTemplate={newTemplate}
      templates={templates}
      onDeleteButtonClick={onDeleteButtonClick}
      onNewButtonClick={onNewButtonClick}
      onSearchTermChange={onSearchTermChange}
      sortOrder={sortOrder}
      changeSortOrder={changeSortOrder}
    />
  )
  return {
    ...outcome,
    getButtons: () => outcome.getAllByRole("button") as HTMLButtonElement[],
    getNewTemplateButton: () =>
      outcome.getByText(intl.formatMessage(messages.newButton)),
  }
}

test("renders new template button properly", () => {
  const { getNewTemplateButton } = renderTemplates()
  expect(getNewTemplateButton()).toBeInTheDocument()
})

test("renders search input properly", () => {
  const { getByPlaceholderText } = renderTemplates()
  expect(
    getByPlaceholderText(intl.formatMessage(messages.searchPlaceholder))
  ).toBeInTheDocument()
})

test("calls proper action after new template button click", () => {
  const onClick = jest.fn()
  const { getByTestId } = renderTemplates({
    onNewButtonClick: onClick,
  })
  getByTestId(TemplatesTestIds.AddTemplateButton).click()
  expect(getByTestId(TemplatesTestIds.TextEditor)).toBeInTheDocument()
})

test("correct number of rows is rendered", () => {
  const { getAllByRole } = renderTemplates()
  expect(getAllByRole("listitem")).toHaveLength(mockedTemplateData.length)
})

test("when templates are empty, empty state information is rendered", () => {
  const { getByTestId } = renderTemplates({ templates: [] })
  expect(getByTestId(TemplatesTestIds.EmptyState)).toBeInTheDocument()
})

test("when row is clicked sidebar is displayed", () => {
  const { getAllByRole, getByTestId } = renderTemplates()
  const exampleRow = getAllByRole("listitem")[0]
  fireEvent.click(exampleRow)
  expect(getByTestId(TemplatesTestIds.TextEditor)).toBeInTheDocument()
})

test("sort order changes from descending to ascending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderTemplates({ changeSortOrder })
  getByTestId(TemplatesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Ascending)
})

test("sort order changes from ascending to descending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderTemplates({
    changeSortOrder,
    sortOrder: SortOrder.Ascending,
  })
  getByTestId(TemplatesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Descending)
})
