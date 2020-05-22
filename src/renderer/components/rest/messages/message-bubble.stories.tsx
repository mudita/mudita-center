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

const messages = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?",
]
const multipleMessages = [
  "1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?",
  "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?",
]

storiesOf("Components|Message Bubble", module)
  .add("Owner bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          messages={messages}
        />
      </Wrapper>
    )
  })
  .add("Interlocutor bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          messages={messages}
          interlocutor
        />
      </Wrapper>
    )
  })
  .add("Interlocutor bubble - multiple messages", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          messages={multipleMessages}
          interlocutor
        />
      </Wrapper>
    )
  })
