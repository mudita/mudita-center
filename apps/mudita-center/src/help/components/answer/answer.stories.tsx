/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { MemoryRouter, Route, RouteComponentProps } from "react-router"
import { data, mockedRouteAndPath } from "App/__deprecated__/seeds/help"
import { renderAnswer } from "App/help/helpers/render-answer"

storiesOf("Views/Help", module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={[mockedRouteAndPath.route]}>
      <div style={{ maxWidth: "97.5rem" }}>{story()}</div>
    </MemoryRouter>
  ))
  .add("Details UI - Answer", () => {
    const AnswerComponent = (
      props: RouteComponentProps<{ questionId: string }>
    ) => renderAnswer(data, props)
    return <Route path={mockedRouteAndPath.path} component={AnswerComponent} />
  })
