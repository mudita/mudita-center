import React, { ChangeEvent, useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { renderAnswer } from "Renderer/modules/help/render-utils"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"

interface Props {
  history: History
}

const HelpApp: FunctionComponent<Props> = ({ history }) => {
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
  useEffect(() => {
    const fetchData = async () => {
      const response = await ipcRenderer.invoke(
        HelpActions.DownloadContentfulData
      )
      const normalizeData = normalizeHelpData(response)
      setData(normalizeData)
      await ipcRenderer.invoke(HelpActions.SetStoreValue, normalizeData)
    }

    fetchData()
  }, [])

  const searchQuestion = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const filteredIds = Object.keys(data.items)
      .map((id) => data.items[id])
      .filter(({ question }) =>
        question.toLowerCase().includes(target.value.toLowerCase())
      )
      .map(({ id }) => id)
    setData({
      ...data,
      collection: filteredIds,
    })
  }

  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${URL_MAIN.help}/:questionId`}>{AnswerComponent}</Route>
        <Route path={URL_MAIN.help}>
          <Help list={data} searchQuestion={searchQuestion} />
        </Route>
      </Switch>
    </Router>
  )
}

export default HelpApp
