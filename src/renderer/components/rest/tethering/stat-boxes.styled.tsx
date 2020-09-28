import styled from "styled-components"
import { fadeAnimation } from "Renderer/components/core/modal/modal.styled.elements"
import { DataBoxesWrapper } from "Renderer/components/rest/meditation/data-box/data-boxes.component"
import { transitionTime } from "Renderer/styles/theming/theme-getters"

export const StatBoxesWrapper = styled(DataBoxesWrapper)`
  ${fadeAnimation};
  animation-duration: ${transitionTime("slow")};
`
