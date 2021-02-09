/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { renderAnswer } from "Renderer/modules/help/render-utils"
import { useHelpSearch } from "Renderer/utils/hooks/use-help-search/use-help-search"
import ContextMenu from "App/context-menu/context-menu"

interface Props {
  history: History
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>
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
  }, [searchInputValue])
  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)

  useEffect(() => {
    const helpContextMenu = new ContextMenu()

    // TODO: Add options for context menu

    helpContextMenu.init()
  }, [])

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
