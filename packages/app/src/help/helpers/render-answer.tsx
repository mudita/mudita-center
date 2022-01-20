/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { QuestionAndAnswer } from "App/help/components/help.component"
import { RouteComponentProps } from "react-router"
import Answer from "App/help/components/answer/answer.component"
import React from "react"

export const renderAnswer = (
  data: QuestionAndAnswer,
  props: RouteComponentProps<{ questionId: string }>
) => <Answer list={data} {...props} />
