/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { Route, Router, Switch } from "react-router"
import { ipcRenderer } from "electron-better-ipc"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import history from "Core/core/history"
import { QuestionAndAnswer } from "Core/help/components/help.component"
import Help from "Core/help/help.container"
import { renderAnswer } from "Core/help/helpers/render-answer"
import { useHelpSearch } from "Core/__deprecated__/renderer/utils/hooks/use-help-search/use-help-search"
import ContextMenu from "Core/__deprecated__/context-menu/context-menu"
import { Feature, flags } from "Core/feature-flags"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import AltLinkDownloadPreventer from "Core/core/components/alt-link-download-preventer.component"

const devModeEnabled = flags.get(Feature.DeveloperModeEnabled)

const saveToStore = async (normalizeData: QuestionAndAnswer) =>
  await ipcRenderer.callMain(HelpActions.SetStoreValue, normalizeData)
const getStoreData = async (key?: string) =>
  await ipcRenderer.callMain(HelpActions.GetStore, key)

const HelpApp: FunctionComponent = () => {
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
      <AltLinkDownloadPreventer>
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
      </AltLinkDownloadPreventer>
    </Router>
  )
}

export default HelpApp
