import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import Templates from "Renderer/modules/messages/tabs/templates-ui.component"
import { mockedTemplateData } from "Renderer/modules/messages/__mocks__/template-modal-data"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.interface"
import { fireEvent } from "@testing-library/dom"

mockAllIsIntersecting(true)

const renderer = (emptyState?: boolean) => {
  return renderWithThemeAndIntl(
    <Templates templates={emptyState ? [] : mockedTemplateData} />
  )
}

test("correct number of rows is rendered", () => {
  const { getAllByRole } = renderer()
  expect(getAllByRole("listitem")).toHaveLength(mockedTemplateData.length)
})

test("when templates are empty, empty state information is rendered", () => {
  const { getByTestId } = renderer(true)
  expect(getByTestId(TemplatesTestIds.EmptyState)).toBeInTheDocument()
})

test("when row is clicked sidebar is displayed", () => {
  const { getAllByRole, getByTestId } = renderer()
  const exampleRow = getAllByRole("listitem")[0]
  fireEvent.click(exampleRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})
