import * as React from "react"
import UpdateButtonComponent from "App/__deprecated__/renderer/components/rest/news/update-button/update-button.component"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default {
  title: "News/Update Button",
}

export const Updating = () => {
  return (
    <Container>
      <UpdateButtonComponent updating />
    </Container>
  )
}

export const DefaultState = () => {
  return (
    <Container>
      <UpdateButtonComponent />
    </Container>
  )
}

DefaultState.story = {
  name: "Default state",
}
