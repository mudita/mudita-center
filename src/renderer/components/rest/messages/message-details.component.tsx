import React, { useEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import MessageBubble from "Renderer/components/rest/messages/message-bubble.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import {
  backgroundColor,
} from "Renderer/styles/theming/theme-getters"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { intl } from "Renderer/utils/intl"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { buttonComponentAnimationStyles } from "Renderer/components/core/button/button.styled.elements"

interface Props {
  details: ActiveRow
  onClose?: () => void
  onDeleteClick: (id: string) => void
  onUnreadStatus: (ids: string[]) => void
  onContactClick: (phoneNumber: string) => void
  onAttachContactClick: () => void
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
  margin-top: 1.2rem;
  margin-bottom: 2.4rem;
`

const TextareaWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${backgroundColor("row")};
  padding: 0 3rem;
`

const Textarea = styled(InputComponent)`
  margin-bottom: 1.6rem;
`

const MessagesSidebar = styled(Sidebar)`
  border-top: none;
`

const LeadingButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly2,
}))`
  ${buttonComponentAnimationStyles};
`

const trailingIcon = [
  <Icon type={Type.Send} key={Type.Send} size={IconSize.Big} />,
]

const MessageDetails: FunctionComponent<Props> = ({
  details,
  onClose = noop,
  onUnreadStatus,
  onDeleteClick,
  onContactClick,
  onAttachContactClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
  }, [ref.current])

  const markAsUnread = () => {
    onUnreadStatus([details.id])
    onClose()
  }

  const handleDeleteClick = () => onDeleteClick(details.id)
  const handleContactClick = () => onContactClick(details.caller.phoneNumber)

  const icons = (
    <>
      <SidebarHeaderIcon
        Icon={Type.Calls}
        onClick={noop}
        iconSize={IconSize.Big}
      />
      <SidebarHeaderIcon
        Icon={Type.Contact}
        onClick={handleContactClick}
        iconSize={IconSize.Big}
      />
      <SidebarHeaderIcon
        Icon={Type.BorderCheckIcon}
        onClick={markAsUnread}
        iconSize={IconSize.Big}
      />
      <SidebarHeaderIcon
        Icon={Type.Delete}
        onClick={handleDeleteClick}
        iconSize={IconSize.Big}
      />
    </>
  )

  const leadingIcons = [
    <LeadingButton
      key={Type.AttachContact}
      Icon={Type.AttachContact}
      onClick={onAttachContactClick}
    />,
    <Icon type={Type.Template} key={Type.Template} size={IconSize.Big} />,
  ]

  const nameAvailable = isNameAvailable(details.caller)
  return (
    <MessagesSidebar
      show
      headerLeft={
        <>
          <Text
            displayStyle={TextDisplayStyle.LargeBoldText}
            data-testid="sidebar-fullname"
          >
            {nameAvailable
              ? createFullName(details.caller)
              : details.caller.phoneNumber}
          </Text>
          {nameAvailable && (
            <PhoneNumberText
              displayStyle={TextDisplayStyle.MediumFadedLightText}
              data-testid="sidebar-phone-number"
            >
              {details.caller.phoneNumber}
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
              const previousAuthor = prevMessage?.author.id !== author.id
              if (index === details.messages.length - 1) {
                return (
                  <div ref={ref} key={id}>
                    <MessageBubble
                      id={id}
                      user={author}
                      message={content}
                      interlocutor={interlocutor}
                      previousAuthor={previousAuthor}
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
                  previousAuthor={previousAuthor}
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
          label={intl.formatMessage({
            id: "view.name.messages.textAreaPlaceholder",
          })}
        />
      </TextareaWrapper>
    </MessagesSidebar>
  )
}

export default MessageDetails
