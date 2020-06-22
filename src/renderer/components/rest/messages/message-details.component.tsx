import React, { useEffect, useRef } from "react"
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
import { createFullName } from "Renderer/models/phone/phone.utils"
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
  overflow: auto;
`

const MessageBubblesWrapper = styled.div`
  margin-top: 3.2rem;
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

const MessagesSidebar = styled(Sidebar)`
  border-top: none;
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
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])
  const icons = (
    <>
      <SidebarHeaderIcon Icon={Type.Calls} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Contacts} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.BorderCheckIcon} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={noop} />
    </>
  )
  const checkForName = details.caller.firstName || details.caller.lastName
  return (
    <MessagesSidebar
      show
      headerLeft={
        <>
          <Text
            displayStyle={TextDisplayStyle.LargeBoldText}
            data-testid="sidebar-fullname"
          >
            {checkForName
              ? createFullName(details.caller)
              : details.caller.primaryPhoneNumber ||
                details.caller.secondaryPhoneNumber}
          </Text>
          {checkForName && (
            <PhoneNumberText
              displayStyle={TextDisplayStyle.MediumFadedLightText}
              data-testid="sidebar-phone-number"
            >
              {details.caller.primaryPhoneNumber ||
                details.caller.secondaryPhoneNumber}
            </PhoneNumberText>
          )}
        </>
      }
      headerRight={icons}
      onClose={onClose}
      appColorSidebarHeader
      padded={false}
    >
      <MessagesWrapper>
        <MessageBubblesWrapper>
          {details.messages.map(
            ({ author, content, interlocutor, id }, index) => {
              const prevMessage = details.messages[index - 1]
              const newAuthor =
                !prevMessage || (prevMessage && prevMessage.author !== author)
              if (index === details.messages.length - 1) {
                return (
                  <div ref={ref} key={id}>
                    <MessageBubble
                      id={id}
                      user={author}
                      message={content}
                      interlocutor={interlocutor}
                      newAuthor={newAuthor}
                    />
                  </div>
                )
              }
              return (
                <MessageBubble
                  key={id}
                  id={id}
                  user={author}
                  message={content}
                  interlocutor={interlocutor}
                  newAuthor={newAuthor}
                />
              )
            }
          )}
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
    </MessagesSidebar>
  )
}

export default MessageDetails
