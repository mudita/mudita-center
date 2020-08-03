import React, { ComponentType, useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import AnswerUI from "Renderer/components/rest/help/answer-ui.component"
import { helpSeed } from "App/seeds/help"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import axios from "axios"
import { normalizeHelpData } from "Renderer/utils/normalize-help-data"

interface Props {
  history: History
}

const HelpApp: FunctionComponent<Props> = ({ history }) => {
  const [data, setData] = useState<QuestionAndAnswer>()
  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `https://preview.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/staging/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=pdaHelp`
      )
      const normalizeData = normalizeHelpData(response)
      setData(normalizeData)
    }

    fetchData()
  }, [])

  console.log(data)

  const renderRoute = (Component: ComponentType<any>) => (
    props: RouteComponentProps
  ) => {
    return <Component {...props} list={helpSeed.list} />
  }
  return (
    <Router history={history}>
      <Switch>
        <Route
          path={`${URL_MAIN.help}/:questionId`}
          render={renderRoute(AnswerUI)}
        />
        <Route path={URL_MAIN.help} render={renderRoute(Help)} />
      </Switch>
    </Router>
  )
}

export default HelpApp
