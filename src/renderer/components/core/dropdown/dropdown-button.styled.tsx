import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled from "styled-components"

export const DropdownButton = styled(Button).attrs(({ displayStyle }) => ({
  displayStyle: displayStyle || DisplayStyle.Link1,
}))`
  padding: 1.7rem 2.4rem;
`
