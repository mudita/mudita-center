import React, { SVGAttributes } from "react"
import { AppFunctionComponent } from "@mudita/app-function-component"
import { IconWrapper } from "Components/icon/icon.styled"
import { IconSize, IconType } from "Components/icon/icon.enum"
import { Icons } from "Components/icon/icon.type"
import { Color } from "Theme/color"

import { checkboxIcons } from "Components/checkbox/checkbox.icon"
import { iconSizes } from "Components/icon/icon.helpers"

const icons: Icons = {
  ...checkboxIcons,
} as const

interface Props {
  type: IconType
  color?: Color
  size?: IconSize
  stretch?: boolean
  width?: number
  height?: number
}

export const Icon: AppFunctionComponent<Props> = ({
  type,
  size,
  stretch,
  width = 0,
  height = 0,
  color,
  ...rest
}) => {
  const Svg = icons[type]
  const svgProps = Svg({})?.props as SVGAttributes<SVGElement>
  const { viewBox, width: orgWidth, height: orgHeight } = svgProps

  const targetWidth = width || (size && iconSizes[size]) || height
  const targetHeight = height || (size && iconSizes[size]) || width

  let newProps: SVGAttributes<SVGElement> = {}

  if (viewBox && orgWidth && orgHeight) {
    if (targetWidth && targetHeight) {
      const [x0, y0, x1, y1] = viewBox.split(" ").map(Number)

      const svgWidth = Math.abs(x1 - x0)
      const svgHeight = Math.abs(y1 - y0)

      if (stretch) {
        const widthRatio = (targetWidth || svgWidth / 10) / svgWidth
        const heightRatio = (targetHeight || svgHeight / 10) / svgHeight

        newProps = {
          width: `${svgWidth * widthRatio}rem`,
          height: `${svgHeight * heightRatio}rem`,
        }
      } else {
        const dx = (Number(orgWidth) - svgWidth) / -2
        const dy = (Number(orgHeight) - svgHeight) / -2

        newProps = {
          viewBox: `${dx} ${dy} ${orgWidth} ${orgHeight}`,
          width: `${targetWidth}rem`,
          height: `${targetHeight}rem`,
        }
      }
    }
  } else {
    console.warn(
      "SVG image is not valid. Required props are: viewBox, width and height."
    )
  }

  return (
    <IconWrapper {...rest} color={color}>
      {Svg(newProps)}
    </IconWrapper>
  )
}
