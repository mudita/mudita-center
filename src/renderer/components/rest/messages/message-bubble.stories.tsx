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

storiesOf("Components|Message Bubble", module)
  .add("Owner bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"
          }
        />
      </Wrapper>
    )
  })
  .add("Interlocutor bubble", () => {
    return (
      <Wrapper>
        <MessageBubble
          user={{ firstName: "user", lastName: "Luserowski" }}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae?"
          }
          interlocutor
        />
      </Wrapper>
    )
  })
