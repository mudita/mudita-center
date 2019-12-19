import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

interface Props {
  Icon?: FunctionComponent<ImageInterface>
  text?: string
}

const DropdownElement = styled.li`
  display: flex;
  padding: 0.9rem 1.9rem 0.9rem 2.4rem;
  &:hover {
    background-color: ${backgroundColor("primaryDark")};
  }
`

const StyledIcon = styled(Svg)`
  margin-right: 0.8rem;
`

const DropdownItem: FunctionComponent<Props> = ({ Icon, text }) => (
  <DropdownElement>
    {Icon && <StyledIcon Image={Icon} />}
    <Text displayStyle={TextDisplayStyle.SmallText}>{text}</Text>
  </DropdownElement>
)

export default DropdownItem
