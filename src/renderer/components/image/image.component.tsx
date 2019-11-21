import { ImgHTMLAttributes } from "react"
import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

const Image: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = "",
  ...rest
}) => <img alt={alt} {...rest} />

export default Image
