import { data, mockedHeadingText, mockedRouteAndPath } from "App/seeds/help"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Route, RouteComponentProps, Router } from "react-router"
import React from "react"
import { createMemoryHistory, MemoryHistory } from "history"
import { AnswerUiTestIds } from "Renderer/components/rest/help/answer-ui-test-ids.enum"
import { renderAnswer } from "App/renderer/modules/help/render-utils"

const renderWithRouterMatch = ({
  path = "/",
  route = "/",
  history = createMemoryHistory({ initialEntries: [route] }),
}: {
  path: string
  route: string
  history?: MemoryHistory
}) => {
  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)
  return {
    ...renderWithThemeAndIntl(
      <Router history={history}>
        <Route path={path} component={AnswerComponent} />
      </Router>
    ),
  }
}

test("content is rendered", () => {
  const { getByTestId } = renderWithRouterMatch(mockedRouteAndPath)
  expect(getByTestId(AnswerUiTestIds.Content)).toHaveTextContent(
    mockedHeadingText
  )
})

test("back link has correct text ", () => {
  const { getByTestId } = renderWithRouterMatch(mockedRouteAndPath)
  const backLinkText = "view.name.help.backLinkText"
  expect(getByTestId(AnswerUiTestIds.BackLink)).toHaveTextContent(backLinkText)
})
