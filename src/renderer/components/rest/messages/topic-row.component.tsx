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
import styled, { css } from "styled-components"

const Checkbox = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  grid-area: Avatar;
  align-self: center;
  justify-self: center;
  width: 2rem;
  height: 2rem;
  margin: 0;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in-out;
`

const Avatar = styled.div<{ default: boolean }>`
  grid-area: Avatar;
  width: 4.8rem;
  height: 4.8rem;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${backgroundColor("accent")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  transition: all 0.15s ease-in-out;

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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  justify-self: center;
`

const topicHoverState = css`
  ${Checkbox} {
    opacity: 1;
    visibility: visible;
  }
  ${Avatar} {
    opacity: 0;
    visibility: hidden;
  }
`

const TopicRowWrapper = styled.div<{ showCheckbox: boolean }>`
  display: grid;
  grid-template-columns: 11rem auto 1fr 9rem;
  grid-template-rows: 2.4rem 2.4rem;
  grid-template-areas:
    "Avatar Name Date Actions"
    "Avatar Message Message Actions";
  align-content: center;
  height: 9rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${backgroundColor("accent")};
    ${topicHoverState};
  }

  ${({ showCheckbox }) => showCheckbox && topicHoverState};
`

interface TopicRowProps extends Topic {
  actions: ReactNode
  onCheckToggle: (id: string) => void
  showCheckbox: boolean
}

const TopicRow: FunctionComponent<TopicRowProps> = ({
  _id,
  caller,
  messages,
  unread,
  actions,
  onCheckToggle,
  showCheckbox,
}) => {
  const { forename, surname, avatar } = caller
  const lastMessage = messages.sort((a, b) => {
    const x = new Date(a.date)
    const y = new Date(b.date)
    return x > y ? -1 : x < y ? 1 : 0
  })[0]

  const onCheckboxToggle = () => {
    onCheckToggle(_id)
  }

  return (
    <TopicRowWrapper showCheckbox={showCheckbox}>
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
      <Checkbox onChange={onCheckboxToggle} />
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
