import React, { useEffect, useLayoutEffect, useState } from "react"
import { random } from "lodash"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import DevMode from "Renderer/modules/help/devmode/devmode.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import { DevMode as DevModeProps } from "Renderer/models/dev-mode/dev-mode.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { version } from "../../../../package.json"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { noop } from "Renderer/utils/noop"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { URL_MAIN } from "Renderer/constants/urls"
import { Link } from "react-router-dom"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { QuestionAndAnswer } from "Renderer/models/help/help.interface"

interface HelpProps extends DevModeProps {
  enable: () => void
  disable: () => void
  helpQuestionsAndAnswers: QuestionAndAnswer[]
}

const HelpPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.6rem 10.5rem 2rem 10.5rem;
  background-color: ${backgroundColor("row")};
  position: sticky;
  top: 0;
`

const SearchInput = styled(InputText)`
  width: 27.5rem;
`

const QuestionsContainer = styled.div`
  padding: 0 8.9rem;
  margin-top: 4.1rem;
  background-color: ${backgroundColor("main")};
`

const Question = styled(Link)`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  transition: background-color ${transitionTime("veryQuick")}
    ${transitionTimingFunction("smooth")};
  &:hover {
    background-color: ${backgroundColor("minorHover")};
  }
`

const ArrowIcon = styled(Icon)`
  transform: rotate(270deg);
`

const textFormatters = {
  b: (str: string) => (
    <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading} element={"span"}>
      {str}
    </Text>
  ),
}

const Help: FunctionComponent<HelpProps> = ({
  disable,
  enable,
  helpQuestionsAndAnswers,
  devModeEnabled,
}) => {
  const [count, setCount] = useState<number>(0)
  const [cheat, setCheat] = useState<string>("")
  const increaseCount = () => {
    setCount((state) => state + 1)
  }

  const getKeyboardInput = ({ key }: KeyboardEvent) => {
    setCheat((current) => `${current}${key}`)
  }

  useLayoutEffect(() => {
    setCheat("") // Electron tends to write stuff here for some reason
    window.addEventListener("keyup", getKeyboardInput)

    return () => {
      window.removeEventListener("keyup", getKeyboardInput)
    }
  }, [])

  useEffect(() => {
    if (count >= random(7, 10) || cheat === "godmode") {
      setCheat("")
      setCount(0)

      enable()
    }
  }, [count, cheat])
  return (
    <div data-testid={HelpComponentTestIds.Wrapper}>
      <HelpPanel>
        <Text
          message={{
            id: "view.name.help.title",
            values: textFormatters,
          }}
          displayStyle={TextDisplayStyle.SecondaryHeading}
          data-testid={HelpComponentTestIds.Title}
        />
        <SearchInput
          type={"search"}
          label={intl.formatMessage({
            id: "view.name.messages.search",
          })}
          outlined
          defaultValue={""}
          onChange={noop}
          leadingIcons={[searchIcon]}
        />
      </HelpPanel>
      <QuestionsContainer>
        {helpQuestionsAndAnswers.map(({ id, question }) => {
          return (
            <Question key={id} to={URL_MAIN.help + `/${id}`}>
              <Text displayStyle={TextDisplayStyle.LargeText}>{question}</Text>
              <ArrowIcon type={Type.ArrowDown} height={1.2} width={1.2} />
            </Question>
          )
        })}
      </QuestionsContainer>

      <br />
      <p
        onClick={increaseCount}
        data-testid={HelpComponentTestIds.ToggleButton}
      >
        App Version: {version}
      </p>
      {devModeEnabled && <DevMode disable={disable} />}
    </div>
  )
}

export default Help
