import React from "react"
import { MemoryRouter, Route, RouteComponentProps } from "react-router"
import { data, mockedRouteAndPath } from "App/__deprecated__/seeds/help"
import { renderAnswer } from "App/help/helpers/render-answer"

export default {
  title: "Views/Help",

  decorators: [
    (story) => (
      <MemoryRouter initialEntries={[mockedRouteAndPath.route]}>
        <div style={{ maxWidth: "97.5rem" }}>{story()}</div>
      </MemoryRouter>
    ),
  ],
}

export const DetailsUiAnswer = () => {
  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)
  return <Route path={mockedRouteAndPath.path} component={AnswerComponent} />
}

DetailsUiAnswer.story = {
  name: "Details UI - Answer",
}
