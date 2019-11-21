import { ImgHTMLAttributes } from "react"
import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

const Image: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  alt = "",
  ...rest
}) => <img src={src} alt={alt} {...rest} />

export default Image
