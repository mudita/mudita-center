/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Route, Router, Switch } from "react-router"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import history from "Core/core/routes/history"
import { QuestionAndAnswer } from "Core/help/components/help.component"
import Help from "Core/help/help.container"
import { renderAnswer } from "Core/help/helpers/render-answer"
import { useHelpSearch } from "Core/__deprecated__/renderer/utils/hooks/use-help-search/use-help-search"
import ContextMenu from "Core/__deprecated__/context-menu/context-menu"
import { Feature, flags } from "Core/feature-flags"

interface Props {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStoreData?: (key?: string) => Promise<any>
}

const devModeEnabled = flags.get(Feature.DeveloperModeEnabled)

const HelpApp: FunctionComponent<Props> = ({ saveToStore, getStoreData }) => {
  const { data, searchQuestion } = useHelpSearch(saveToStore, getStoreData)
  const [searchInputValue, setSearchInputValue] = useState("")
  useEffect(() => {
    searchQuestion(searchInputValue)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputValue])

  useEffect(() => {
    if (devModeEnabled) {
      const helpContextMenu = new ContextMenu()
      helpContextMenu.init()
    }
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <Route
          path={`${URL_MAIN.help}/:questionId`}
          render={(props) => renderAnswer(data, props)}
        />
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
