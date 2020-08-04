import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import AnswerUI from "Renderer/components/rest/help/answer-ui.component"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import axios from "axios"
import { normalizeHelpData } from "Renderer/utils/normalize-help-data"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"

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
      const { data: response } = await axios.get(
        `https://preview.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/staging/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=pdaHelp`
      )
      const normalizeData = normalizeHelpData(response)
      setData(normalizeData)
      await ipcRenderer.invoke(HelpActions.SetStoreValue, normalizeData)
    }

    fetchData()
  }, [])

  const renderHelp = () => <Help list={data} />

  const renderAnswer = (props: RouteComponentProps<{ questionId: string }>) => (
    <AnswerUI list={data} {...props} />
  )
  return data ? (
    <Router history={history}>
      <Switch>
        <Route path={`${URL_MAIN.help}/:questionId`}>{renderAnswer}</Route>
        <Route path={URL_MAIN.help}>{renderHelp}</Route>
      </Switch>
    </Router>
  ) : null
}

export default HelpApp
