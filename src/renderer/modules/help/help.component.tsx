import React from "react"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { noop } from "Renderer/utils/noop"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { URL_MAIN } from "Renderer/constants/urls"
import { Link } from "react-router-dom"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"

export interface QuestionAndAnswer {
  collection?: string[]
  items: Record<string, { question: string; answer: string }>
}

interface HelpProps {
  list: QuestionAndAnswer
}

const HelpPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.6rem 10.5rem 2rem 10.5rem;
  background-color: ${backgroundColor("row")};
  position: sticky;
  top: 0;
  z-index: ${zIndex("content")};
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

const Help: FunctionComponent<HelpProps> = ({ list }) => {
  const { collection, items } = list
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
        {collection &&
          collection.map((id: string) => {
            return (
              <Question key={id} to={`${URL_MAIN.help}/${id}`}>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  {items[id].question}
                </Text>
                <ArrowIcon type={Type.ArrowDown} height={1.2} width={1.2} />
              </Question>
            )
          })}
      </QuestionsContainer>
    </div>
  )
}

export default Help
