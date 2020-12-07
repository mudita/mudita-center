import styled from "styled-components"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"

export const ViewWrapper = styled.div<DevMode>`
  grid-area: View;
  display: flex;
  flex-direction: column;
  overflow: ${({ devModeEnabled }) => devModeEnabled && "scroll"};
`
