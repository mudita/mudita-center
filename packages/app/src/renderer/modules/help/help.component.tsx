/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
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
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { URL_MAIN } from "Renderer/constants/urls"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { NormalizedHelpEntry } from "Renderer/utils/contentful/normalize-help-data"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "Renderer/components/rest/contact-support-modal/contact-support-modal-flow.component"
import { CreateBugTicketResponseStatus } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import { ContactSupportFieldValues } from "Renderer/components/rest/contact-support-modal/contact-support-modal.component"
import logger from "App/main/utils/logger"
import useCreateBugTicket, {
  files,
} from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"

export interface QuestionAndAnswer {
  collection: string[]
  items: Record<string, NormalizedHelpEntry>
}

interface HelpProps {
  list: QuestionAndAnswer
  searchQuestion: (value: string) => void
  searchValue?: string
  serialNumber?: string
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
  margin-left: 1.2rem;
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
  list: { collection = [], items },
  searchQuestion,
  searchValue,
  serialNumber,
}) => {
  const [contactSupportOpenState, setContactSupportOpenState] =
    useState<ContactSupportModalFlowState>()
  const search = (event: ChangeEvent<HTMLInputElement>) => {
    searchQuestion(event.target.value)
  }
  const [sendBugTicketRequest, sending] = useCreateBugTicket()
  const [bugTicketSubject, setBugTicketSubject] = useState("")

  const openContactSupportModalFlow = () => {
    setBugTicketSubject(`Error - help support`)
    setContactSupportOpenState(ContactSupportModalFlowState.Form)
  }

  const closeContactSupportModalFlow = () => {
    setContactSupportOpenState(undefined)
  }
  const sendBugTicket = async ({
    email,
    description,
  }: ContactSupportFieldValues) => {
    const response = await sendBugTicketRequest({
      email,
      description,
      serialNumber,
      subject: bugTicketSubject,
    })
    if (response.status === CreateBugTicketResponseStatus.Ok) {
      setContactSupportOpenState(ContactSupportModalFlowState.Success)
    } else {
      setContactSupportOpenState(ContactSupportModalFlowState.Fail)
      logger.error(`Help: ${response.error?.message}`)
    }
  }
  return (
    <div data-testid={HelpComponentTestIds.Wrapper}>
      {contactSupportOpenState && (
        <ContactSupportModalFlow
          openState={contactSupportOpenState}
          files={files}
          onSubmit={sendBugTicket}
          sending={sending}
          closeModal={closeContactSupportModalFlow}
        />
      )}
      <HelpPanel>
        <Text
          message={{
            id: "module.help.title",
            values: textFormatters,
          }}
          displayStyle={TextDisplayStyle.SecondaryHeading}
          data-testid={HelpComponentTestIds.Title}
        />
        <SearchContainer>
          <ButtonComponent
            displayStyle={DisplayStyle.IconOnly3}
            Icon={Type.Support}
            iconSize={IconSize.Small}
            onClick={openContactSupportModalFlow}
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
