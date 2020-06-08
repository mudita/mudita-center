import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { ActiveRow } from "Renderer/components/rest/messages/messages-list.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import MessageBubble from "Renderer/components/rest/messages/message-bubble.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

interface Props {
  details: ActiveRow
  onClose?: () => void
}

const PhoneNumberText = styled(Text)`
  margin-top: 0.8rem;
`

const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 3rem;
`

const MessageBubblesWrapper = styled.div`
  margin-top: 3.2rem;
  height: 40rem;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`

const MessageDetailsBubble = styled(MessageBubble)`
  margin-bottom: 2.4rem;
`

const TextareaWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${backgroundColor("light")};
  padding: 0 3rem;
`

const Textarea = styled(InputComponent)`
  margin-bottom: 1.6rem;
`

const leadingIcons = [
  <Icon type={Type.AttachContact} key={Type.AttachContact} />,
  <Icon type={Type.Template} key={Type.Template} />,
]

const trailingIcon = [<Icon type={Type.Send} key={Type.Send} />]

const MessageDetails: FunctionComponent<Props> = ({
  details,
  onClose = noop,
}) => {
  const icons = (
    <>
      <SidebarHeaderIcon Icon={Type.Calls} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Contacts} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.BorderCheckIcon} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={noop} />
    </>
  )
  return (
    <Sidebar
      show
      headerLeft={
        <>
          <Text
            displayStyle={TextDisplayStyle.LargeBoldText}
            data-testid="sidebar-fullname"
          >
            {details.caller.firstName} {details.caller.lastName}
          </Text>
          <PhoneNumberText
            displayStyle={TextDisplayStyle.MediumFadedLightText}
            data-testid="sidebar-phone-number"
          >
            {details.caller.phoneNumber}
          </PhoneNumberText>
        </>
      }
      headerRight={icons}
      onClose={onClose}
      appColorSidebarHeader
      padded={false}
    >
      <MessagesWrapper>
        <MessageBubblesWrapper>
          {details.messages
            .reverse()
            .map(({ author, content, interlocutor, id }) => {
              return (
                <MessageDetailsBubble
                  key={id}
                  user={author}
                  messages={content}
                  interlocutor={interlocutor}
                />
              )
            })}
        </MessageBubblesWrapper>
      </MessagesWrapper>
      <TextareaWrapper>
        <Textarea
          type="textarea"
          value={""}
          onChange={noop}
          leadingIcons={leadingIcons}
          trailingIcons={trailingIcon}
          disabled
        />
      </TextareaWrapper>
    </Sidebar>
  )
}

export default MessageDetails
