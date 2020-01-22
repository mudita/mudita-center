import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import Battery from "Renderer/svg/battery.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

enum Type {
  Battery,
  Delete,
}

interface Props {
  type: Type
}

const resolveIcon = (icon: Type): FunctionComponent<ImageInterface> => {
  switch (icon) {
    case Type.Battery:
      return Battery
    default:
      return
  }
}

const Icon: FunctionComponent<Props> = ({ type }) => {
  return <Svg Image={resolveIcon(type)} />
}

export default Icon
