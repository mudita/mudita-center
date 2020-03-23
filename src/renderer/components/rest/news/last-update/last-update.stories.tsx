import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Last Update", module)
  .add("Offline", () => {
    return (
      <Container>
        <LastUpdate offline date="2019-10-18T11:27:15.256Z" />
      </Container>
    )
  })
  .add("Online", () => {
    return (
      <Container>
        <LastUpdate offline={false} date="2019-10-18T11:27:15.256Z" />
      </Container>
    )
  })
