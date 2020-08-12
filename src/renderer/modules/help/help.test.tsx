import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import Help from "Renderer/modules/help/help.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { data } from "App/seeds/help"

const defaultProps = {
  list: data,
  searchQuestion: jest.fn(),
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Router history={history}>
      <Help {...props} />
    </Router>
  )
}

test("Help component renders", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(HelpComponentTestIds.Wrapper)).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "view.name.help.title"
  const { getByTestId } = renderer()
  expect(getByTestId(HelpComponentTestIds.Title)).toHaveTextContent(titleText)
})

test("renders correct amount of links", () => {
  const { getAllByRole } = renderer()
  expect(getAllByRole("link")).toHaveLength(defaultProps.list.collection.length)
})
