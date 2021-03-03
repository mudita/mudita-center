/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderButton,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { ActiveRow } from "App/messages/components/messages-list.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import MessageBubble from "App/messages/components/message-bubble.component"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
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

const NameWrapper = styled.div`
  display: flex;
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
      {process.env.NODE_ENV !== "production" && (
        <SidebarHeaderButton
          Icon={Type.Calls}
          onClick={noop}
          iconSize={IconSize.Big}
        />
      )}
      <SidebarHeaderButton
        Icon={Type.Contact}
        onClick={handleContactClick}
        iconSize={IconSize.Big}
      />
      {process.env.NODE_ENV !== "production" && (
        <>
          <SidebarHeaderButton
            Icon={Type.BorderCheckIcon}
            onClick={markAsUnread}
            iconSize={IconSize.Big}
          />
          <SidebarHeaderButton
            Icon={Type.Delete}
            onClick={handleDeleteClick}
            iconSize={IconSize.Big}
          />
        </>
      )}
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

  return (
    <MessagesSidebar
      show
      headerLeft={
        <>
          <NameWrapper>
            <Text
              displayStyle={TextDisplayStyle.LargeBoldText}
              data-testid="sidebar-fullname"
            >
              {getPrettyCaller(details.caller)}
            </Text>
            {Boolean(
              details.caller.phoneNumber && details.caller.secondaryPhoneNumber
            ) && (
              <Text
                displayStyle={TextDisplayStyle.LargeFadedText}
                data-testid="multiple-number"
              >
                &nbsp;
                {details.caller.phoneNumber.split(" ").join("") ===
                details.caller.secondaryPhoneNumber?.split(" ").join("")
                  ? "#2"
                  : "#1"}
              </Text>
            )}
          </NameWrapper>
          {isNameAvailable(details.caller) && (
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
      {process.env.NODE_ENV !== "production" && (
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
      )}
    </MessagesSidebar>
  )
}

export default MessageDetails
