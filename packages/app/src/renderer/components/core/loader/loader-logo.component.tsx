import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ImgHTMLAttributes } from "react"
import Image from "Renderer/components/core/image/image.component"
import Gif from "Renderer/images/loader-transparent.gif"
import styled from "styled-components"

const LoaderImage = styled(Image)`
  object-fit: contain;
`

const LoaderLogo: FunctionComponent<
  ImgHTMLAttributes<HTMLImageElement> & {
    size?: number
  }
> = ({ size = 10, width, height, ...rest }) => (
  <LoaderImage
    data-testid="loader-logo"
    src={Gif}
    width={width || size * 10}
    height={height || size * 10}
    {...rest}
  />
)

export default LoaderLogo
