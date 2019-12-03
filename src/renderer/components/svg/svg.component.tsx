import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"

interface Props {
  className?: string
  Image: ImageInterface
}

const Svg: FunctionComponent<Props> = ({ className, Image }) => {
  const [, , width, height] = Image.defaultProps.viewBox.split(" ")
  // @ts-ignore
  return <Image className={className} width={width} height={height} />
}

export default Svg
