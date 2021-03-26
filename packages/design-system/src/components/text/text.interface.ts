import { FontSize } from "Theme/font-size"
import { Color } from "Theme/color"
import { FontWeight } from "Theme/font-weight"

export interface TextStyleProps {
  tag?: keyof HTMLElementTagNameMap
  size?: FontSize
  color?: Color
  weight?: FontWeight
}
