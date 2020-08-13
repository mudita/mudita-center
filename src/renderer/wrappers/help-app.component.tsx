import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, RouteComponentProps, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import { History } from "history"
import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { renderAnswer } from "Renderer/modules/help/render-utils"
import { useFetchHelp } from "Renderer/utils/hooks/use-fetch-help/use-fetch-help"

interface Props {
  history: History
  saveToStore: (data: QuestionAndAnswer) => Promise<any>
}

const HelpApp: FunctionComponent<Props> = ({ history, saveToStore }) => {
  const { data, setData } = useFetchHelp()
  const [searchValue, setSearchValue] = useState("")

  const searchQuestion = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value)
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
          <Help
            list={data}
            searchQuestion={searchQuestion}
            searchValue={searchValue}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default HelpApp
