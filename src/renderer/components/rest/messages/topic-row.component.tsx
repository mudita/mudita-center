import moment from "moment"
import React, { ReactNode } from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Topic } from "Renderer/modules/messages/messages.component"
import {
  backgroundColor,
  borderColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Avatar = styled.div<{ default: boolean }>`
  grid-area: Avatar;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${backgroundColor("accent")};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  ${Text} {
    margin: 0;
  }
`

const Name = styled(Text)`
  grid-area: Name;
  align-self: end;
  margin: 0;
  padding-bottom: 0.4rem;
  padding-left: 2.5rem;
`

const Time = styled(Text)`
  grid-area: Date;
  align-self: end;
  margin: 0;
  padding-bottom: 0.4rem;
  padding-left: 1rem;
`

const Message = styled(Text)`
  grid-area: Message;
  align-self: center;
  margin: 0;
  padding-left: 2.5rem;
`

const UnreadMessageDot = styled.span`
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${textColor("supplementary")};
  margin-right: 1.2rem;
`

const Actions = styled.div`
  grid-area: Actions;
  align-self: center;
  justify-self: end;
`

const TopicRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 4.8rem auto 1fr 9rem;
  grid-template-rows: 2.4rem 2.4rem;
  grid-template-areas:
    "Avatar Name Date Actions"
    "Avatar Message Message Actions";
  align-content: center;
  height: 9rem;
  padding: 0 3rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};
`

interface TopicRowProps extends Topic {
  actions: ReactNode
}

const TopicRow: FunctionComponent<TopicRowProps> = ({
  caller,
  messages,
  unread,
  actions,
}) => {
  const { forename, surname, avatar } = caller
  const lastMessage = messages.sort((a, b) => {
    const x = new Date(a.date)
    const y = new Date(b.date)
    return x > y ? -1 : x < y ? 1 : 0
  })[0]

  return (
    <TopicRowWrapper>
      <Avatar default={!avatar}>
        {avatar ? (
          <img src={avatar} alt={`${forename} ${surname}`} />
        ) : (
          <Text displayStyle={TextDisplayStyle.LargeFadedDimTextCapitalLetters}>
            {forename.charAt(0)}
            {surname.charAt(0)}
          </Text>
        )}
      </Avatar>
      <Name displayStyle={TextDisplayStyle.LargeBoldText}>
        {forename} {surname}
      </Name>
      <Time displayStyle={TextDisplayStyle.SmallFadedText}>
        {moment(lastMessage.date).format("h:mm:ss A, MMM Do YYYY")}
      </Time>
      <Message
        displayStyle={
          unread
            ? TextDisplayStyle.MediumText
            : TextDisplayStyle.MediumFadedLightText
        }
      >
        {unread && <UnreadMessageDot />}
        {lastMessage.content}
      </Message>
      <Actions>{actions}</Actions>
    </TopicRowWrapper>
  )
}

export default TopicRow
