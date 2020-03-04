import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { ImgHTMLAttributes } from "react"
import Image from "Renderer/components/core/image/image.component"
import Gif from "Renderer/images/loader.gif"

const LoaderGif: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = ({
  ...rest
}) => <Image data-testid="loader-gif" src={Gif} {...rest} />

export default LoaderGif
