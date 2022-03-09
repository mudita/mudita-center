/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { HelpComponentTestIds } from "App/help/components/help.enum"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
  textColor,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { URL_MAIN } from "Renderer/constants/urls"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { NormalizedHelpEntry } from "Renderer/utils/contentful/normalize-help-data"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
export interface QuestionAndAnswer {
  collection: string[]
  items: Record<string, NormalizedHelpEntry>
}

interface Props {
  list: QuestionAndAnswer
  searchQuestion: (value: string) => void
  searchValue?: string
  openContactSupportFlow: () => void
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchInput = styled(InputText)`
  width: 27.5rem;
  margin-left: 0.8rem;
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
    background-color: ${backgroundColor("minor")};
  }
`

const ArrowIcon = styled(Icon)`
  transform: rotate(270deg);
`

const SupportButtonComponent = styled(ButtonComponent)`
  svg path {
    fill: ${textColor("secondary")};
  }
`
const NormalHeading = styled(Text)`
  font-weight: ${fontWeight("default")};
`

const textFormatters = {
  b: (str: string) => (
    <NormalHeading displayStyle={TextDisplayStyle.Headline3} element={"span"}>
      {str}
    </NormalHeading>
  ),
}

const Help: FunctionComponent<Props> = ({
  list: { collection = [], items },
  searchQuestion,
  searchValue,
  openContactSupportFlow,
}) => {
  const search = (event: ChangeEvent<HTMLInputElement>) => {
    searchQuestion(event.target.value)
  }

  return (
    <>
      <ModalsManager />
      <div data-testid={HelpComponentTestIds.Wrapper}>
        <HelpPanel>
          <Text
            message={{
              id: "module.help.title",
              values: textFormatters,
            }}
            displayStyle={TextDisplayStyle.Headline3}
            data-testid={HelpComponentTestIds.Title}
          />
          <SearchContainer>
            <SupportButtonComponent
              displayStyle={DisplayStyle.IconOnly}
              Icon={Type.Support}
              iconSize={IconSize.Small}
              onClick={openContactSupportFlow}
              data-testid={HelpComponentTestIds.SupportButton}
            />
            <SearchInput
              type={"search"}
              label={intl.formatMessage({
                id: "module.messages.search",
              })}
              outlined
              onChange={search}
              leadingIcons={[searchIcon]}
              value={searchValue}
            />
          </SearchContainer>
        </HelpPanel>
        <QuestionsContainer>
          {collection
            .sort((aId, bId) => {
              const questionA = items[aId].question.toUpperCase()
              const questionB = items[bId].question.toUpperCase()
              if (questionA < questionB) {
                return -1
              }
              if (questionA > questionB) {
                return 1
              }

              return 0
            })
            .map((id: string) => {
              return (
                <Question
                  key={id}
                  to={`${URL_MAIN.help}/${id}`}
                  data-testid={HelpComponentTestIds.Question}
                >
                  <Text displayStyle={TextDisplayStyle.Paragraph1}>
                    {items[id].question}
                  </Text>
                  <ArrowIcon type={Type.ArrowDown} height={1.2} width={1.2} />
                </Question>
              )
            })}
        </QuestionsContainer>
      </div>
    </>
  )
}

export default Help
