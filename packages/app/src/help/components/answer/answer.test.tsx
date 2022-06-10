/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  data,
  mockedHeadingText,
  mockedParagraphText,
  mockedMinorHeadingText,
  mockedRouteAndPath,
} from "App/__deprecated__/seeds/help"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Route, RouteComponentProps, Router } from "react-router"
import React from "react"
import { createMemoryHistory, MemoryHistory } from "history"
import { AnswerUiTestIds } from "App/help/components/answer/answer-test-ids.enum"
import { renderAnswer } from "App/help/helpers/render-answer"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"

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
    `${mockedHeadingText}${mockedParagraphText}${mockedMinorHeadingText}`
  )
})

test("error text is rendered", () => {
  const { getByText } = renderWithRouterMatch({
    route: `${URL_MAIN.help}/error-route`,
    path: `${URL_MAIN.help}/:questionId`,
  })
  expect(getByText("[value] module.help.answerError")).toBeInTheDocument()
})

test("back link has correct text ", () => {
  const { getByTestId } = renderWithRouterMatch(mockedRouteAndPath)
  const backLinkText = "module.help.backLinkText"
  expect(getByTestId(AnswerUiTestIds.BackLink)).toHaveTextContent(backLinkText)
})
