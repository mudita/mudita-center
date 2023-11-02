import MessageBubble from "App/messages/components/message-bubble/message-bubble.component"
import { MessageType } from "App/messages/constants"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ColumnWrapper = styled(Wrapper)`
  flex-direction: column;
`

const message =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"

export default {
  title: "Components/Message Bubble",
}

export const OwnerBubble = () => {
  return (
    <Wrapper>
      <MessageBubble
        user={{ firstName: "user", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        id="123"
        displayAvatar
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
    </Wrapper>
  )
}

OwnerBubble.story = {
  name: "Owner bubble",
}

export const InterlocutorBubble = () => {
  return (
    <Wrapper>
      <MessageBubble
        user={{ firstName: "user", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        interlocutor
        id="123"
        displayAvatar
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
    </Wrapper>
  )
}

InterlocutorBubble.story = {
  name: "Interlocutor bubble",
}

export const InterlocutorBubbleMultipleMessages = () => {
  return (
    <ColumnWrapper>
      <MessageBubble
        user={{ firstName: "user", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        interlocutor
        id="123"
        displayAvatar
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
      <MessageBubble
        user={{ firstName: "user", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        interlocutor
        id="321"
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
    </ColumnWrapper>
  )
}

InterlocutorBubbleMultipleMessages.story = {
  name: "Interlocutor bubble - multiple messages",
}

export const OwnerBubbleMultipleMessages = () => {
  return (
    <ColumnWrapper>
      <MessageBubble
        user={{ firstName: "Kuser", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        displayAvatar
        id="321"
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
      <MessageBubble
        user={{ firstName: "Kuser", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        id="123"
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted={false}
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
    </ColumnWrapper>
  )
}

OwnerBubbleMultipleMessages.story = {
  name: "Owner bubble - multiple messages",
}

export const OwnerBubbleDeletingState = () => {
  return (
    <ColumnWrapper>
      <MessageBubble
        user={{ firstName: "Kuser", lastName: "Luserowski" }}
        date={new Date()}
        message={message}
        id="123"
        messageType={MessageType.OUTBOX}
        isMessageBeingDeleted
        removeMessage={noop}
        searchQuery={""}
        selected={false}
      />
    </ColumnWrapper>
  )
}

OwnerBubbleDeletingState.story = {
  name: "Owner bubble - deleting state",
}
