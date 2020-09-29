import styled from "styled-components"
import { fadeAnimation } from "Renderer/components/core/modal/modal.styled.elements"
import { DataBoxesWrapper } from "Renderer/components/rest/meditation/data-box/data-boxes.component"
import {
  borderColor,
  transitionTime,
} from "Renderer/styles/theming/theme-getters"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import Icon from "Renderer/components/core/icon/icon.component"

export const StatBoxesWrapper = styled(DataBoxesWrapper)`
  ${fadeAnimation};
  animation-duration: ${transitionTime("slow")};
  border-top: 0.1rem solid ${borderColor("tetheringSeparator")};
  padding: 4rem 3rem 0 4rem;
`

export const StatTextWrapper = styled(TextWrapper)`
  display: flex;
  align-items: center;
`

export const RotatedArrowIcon = styled(Icon)`
  transform: rotate(180deg);
`
