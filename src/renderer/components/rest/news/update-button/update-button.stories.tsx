import { storiesOf } from "@storybook/react"
import * as React from "react"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("News|Update Button", module).add("Image", () => {
  return (
    <Container>
      <UpdateButtonComponent />
    </Container>
  )
})
