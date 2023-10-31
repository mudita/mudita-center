/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import { History } from "history"
import { QuestionAndAnswer } from "App/help/components/help.component"
import Help from "App/help/help.container"
import { renderAnswer } from "App/help/helpers/render-answer"
import { useHelpSearch } from "App/__deprecated__/renderer/utils/hooks/use-help-search/use-help-search"

interface Props {
  history: History
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStoreData?: (key?: string) => Promise<any>
}

const HelpApp: FunctionComponent<Props> = ({
  history,
  saveToStore,
  getStoreData,
}) => {
  const { data, searchQuestion } = useHelpSearch(saveToStore, getStoreData)
  const [searchInputValue, setSearchInputValue] = useState("")
  useEffect(() => {
    searchQuestion(searchInputValue)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputValue])
  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${URL_MAIN.help}/:questionId`}>{AnswerComponent}</Route>
        <Route path={URL_MAIN.help}>
          <Help
            list={data}
            searchQuestion={setSearchInputValue}
            searchValue={searchInputValue}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default HelpApp
