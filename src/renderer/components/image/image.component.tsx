import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

interface ImageProps {
  src: string
  alt?: string
}

const Image: FunctionComponent<ImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} />
)

export default Image
