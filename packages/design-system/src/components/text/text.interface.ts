import { FontSize, Color, FontWeight } from "../../.."

export interface TextStyleProps {
  tag?: keyof HTMLElementTagNameMap
  size?: FontSize
  color?: Color
  weight?: FontWeight
}
