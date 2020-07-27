import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import { DevModeTestIds } from "Renderer/modules/help/devmode/devmode.interface"
import Help from "Renderer/modules/help/help.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { data } from "App/seeds/help"

const defaultProps = {
  disable: jest.fn(),
  enable: jest.fn(),
  isDevModeEnabled: false,
  helpQuestionsAndAnswers: data,
}

interface RendererProps {
  disable?: () => void
  enable?: () => void
  devModeEnabled?: boolean
}

const renderer = (extraProps: RendererProps = {}) => {
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

test("Help components displays Dev Mode", () => {
  const { getByTestId } = renderer({ devModeEnabled: true })

  expect(getByTestId(DevModeTestIds.Wrapper)).toBeInTheDocument()
})

test("Help component should enable Dev Mode when conditions are met", () => {
  /**
   * This involves Redux flow, which is tested on its own
   */
  const enable = jest.fn()
  const { getByTestId } = renderer({ enable })

  for (let i = 0; i <= 10; i++) {
    getByTestId(HelpComponentTestIds.ToggleButton).click()
  }

  expect(enable).toBeCalledTimes(1)
})

test("render title correctly", () => {
  const titleText = "view.name.help.title"
  const { getByTestId } = renderer()
  expect(getByTestId(HelpComponentTestIds.Title)).toHaveTextContent(titleText)
})
