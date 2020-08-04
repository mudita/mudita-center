import { data, mockedHeadingText } from "App/seeds/help"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Route, RouteComponentProps, Router } from "react-router"
import React from "react"
import AnswerUI from "Renderer/components/rest/help/answer-ui.component"
import { createMemoryHistory, MemoryHistory } from "history"
import { URL_MAIN } from "Renderer/constants/urls"
import { AnswerUiTestIds } from "Renderer/components/rest/help/answer-ui-test-ids.enum"

const renderAnswer = (props: RouteComponentProps<{ questionId: string }>) => (
  <AnswerUI list={data} {...props} />
)
const renderWithRouterMatch = ({
  path = "/",
  route = "/",
  history = createMemoryHistory({ initialEntries: [route] }),
}: {
  path: string
  route: string
  history?: MemoryHistory
}) => {
  return {
    ...renderWithThemeAndIntl(
      <Router history={history}>
        <Route path={path} component={renderAnswer} />
      </Router>
    ),
  }
}

const testRouteAndPath = {
  route: `${URL_MAIN.help}/${data.collection[0]}`,
  path: `${URL_MAIN.help}/:questionId`,
}

test("content is rendered", () => {
  const { getByTestId } = renderWithRouterMatch(testRouteAndPath)
  expect(getByTestId(AnswerUiTestIds.Content)).toHaveTextContent(
    mockedHeadingText
  )
})

test("back link has correct text ", () => {
  const { getByTestId } = renderWithRouterMatch(testRouteAndPath)
  const backLinkText = "view.name.help.backLinkText"
  expect(getByTestId(AnswerUiTestIds.BackLink)).toHaveTextContent(backLinkText)
})
