import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import axios from "axios"
import { normalizeHelpData } from "Renderer/utils/normalize-help-data"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { renderAnswer } from "Renderer/modules/help/render-utils"

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
        `https://${process.env.PDA_CONTENTFUL_HOST}/spaces/${process.env.PDA_CONTENTFUL_SPACE_ID}/environments/${process.env.PDA_CONTENTFUL_ENVIRONMENT}/entries/?access_token=${process.env.PDA_CONTENTFUL_ACCESS_TOKEN}&content_type=pdaHelp`
      ) // this link has to be replaced with correct one before release
      const normalizeData = normalizeHelpData(response)
      setData(normalizeData)
      await ipcRenderer.invoke(HelpActions.SetStoreValue, normalizeData)
    }

    fetchData()
  }, [])

  const AnswerComponent = (
    props: RouteComponentProps<{ questionId: string }>
  ) => renderAnswer(data, props)
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${URL_MAIN.help}/:questionId`}>{AnswerComponent}</Route>
        <Route path={URL_MAIN.help}>
          <Help list={data} />
        </Route>
      </Switch>
    </Router>
  )
}

export default HelpApp
