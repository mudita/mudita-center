import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { ImgHTMLAttributes } from "react"
import Image from "Renderer/components/core/image/image.component"
import Gif from "Renderer/images/loader.gif"

const LoaderGif: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt,
  ...rest
}) => <Image alt={alt} src={Gif} {...rest} />

export default LoaderGif
