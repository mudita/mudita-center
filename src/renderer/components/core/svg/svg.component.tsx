import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"

interface Props {
  Image: FunctionComponent<ImageInterface>
}

const Svg: FunctionComponent<Props> = ({ className, Image }) => {
  const [, , width, height] = Image.defaultProps!.viewBox!.split(" ")
  return <Image className={className} width={width} height={height} />
}

export default Svg
