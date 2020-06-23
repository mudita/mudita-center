import { storiesOf } from "@storybook/react"
import React from "react"
import MessageBubble from "Renderer/components/rest/messages/message-bubble.component"
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

storiesOf("Components|Message Bubble", module)
  .add("Owner bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          message={message}
          id="123"
          prevAuthor
        />
      </Wrapper>
    )
  })
  .add("Interlocutor bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          message={message}
          interlocutor
          id="123"
          prevAuthor
        />
      </Wrapper>
    )
  })
  .add("Interlocutor bubble - multiple messages", () => {
    return (
      <ColumnWrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          message={message}
          interlocutor
          id="123"
          prevAuthor
        />
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          message={message}
          interlocutor
          id="321"
        />
      </ColumnWrapper>
    )
  })
  .add("Owner bubble - multiple messages", () => {
    return (
      <ColumnWrapper>
        <MessageBubble
          user={{ firstName: "Kuser", lastName: "Luserowski" }}
          message={message}
          prevAuthor
          id="321"
        />
        <MessageBubble
          user={{ firstName: "Kuser", lastName: "Luserowski" }}
          message={message}
          id="123"
        />
      </ColumnWrapper>
    )
  })
