import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

interface Props {
  className?: string
  Image: {
    defaultProps: {
      viewBox: string
    }
  }
}

const Svg: FunctionComponent<Props> = ({ className, Image }) => {
  const [, , width, height] = Image.defaultProps.viewBox.split(" ")
  // @ts-ignore
  return <Image className={className} width={width} height={height} />
}

export default Svg
