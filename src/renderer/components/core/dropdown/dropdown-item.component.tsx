import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

interface Props {
  Icon?: FunctionComponent<ImageInterface>
  text?: string
}

const DropdownElement = styled.li``

const DropdownItem: FunctionComponent<Props> = ({ Icon, text }) => (
  <DropdownElement>
    {Icon && <Svg Image={Icon} />}
    <span>{text}</span>
  </DropdownElement>
)

export default DropdownItem
