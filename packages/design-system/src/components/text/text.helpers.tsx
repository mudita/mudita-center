import { TextDecorator, TextVariant } from "./text.enum"
import { TextStyleProps } from "./text.interface"
import { TextDecorators } from "./text.type"
import { css } from "styled-components"
import { getColor } from "../../theme/theme-getters"

export const textVariants: Record<TextVariant, TextStyleProps> = {
  [TextVariant.HeadingPrimary]: {
    tag: "h1",
    size: "56",
    weight: "light",
  },
  [TextVariant.HeadingSecondary]: {
    tag: "h2",
    size: "40",
    weight: "bold",
  },
  [TextVariant.HeadingTertiary]: {
    tag: "h3",
    size: "32",
    weight: "bold",
  },
  [TextVariant.HeadingQuaternary]: {
    tag: "h4",
    size: "24",
    weight: "bold",
  },
  [TextVariant.Large]: {
    size: "18",
  },
  [TextVariant.LargeBold]: {
    size: "18",
    weight: "bold",
  },
  [TextVariant.Basic]: {},
  [TextVariant.BasicBold]: {
    weight: "bold",
  },
  [TextVariant.BasicGrey]: {
    color: "grey700",
  },
  [TextVariant.Small]: {
    size: "14",
  },
  [TextVariant.SmallBold]: {
    size: "14",
    weight: "bold",
  },
  [TextVariant.SmallGrey]: {
    size: "14",
    color: "grey700",
  },
  [TextVariant.SmallLight]: {
    size: "14",
    weight: "light",
  },
  [TextVariant.SmallLightGrey]: {
    size: "14",
    weight: "light",
    color: "grey700",
  },
  [TextVariant.Tiny]: {
    size: "12",
  },
  [TextVariant.TinyGrey]: {
    size: "12",
    color: "grey700",
  },
  [TextVariant.TinyBold]: {
    size: "12",
    weight: "bold",
  },
  [TextVariant.TinyBoldGrey]: {
    size: "12",
    weight: "bold",
    color: "grey700",
  },
}

export const textDecorators: Record<TextDecorator, TextDecorators> = {
  [TextDecorator.Accent]: css`
    color: ${getColor("blue500")};
  `,
  [TextDecorator.Error]: css`
    color: ${getColor("red")};
  `,
  [TextDecorator.UpperCase]: css`
    text-transform: uppercase;
  `,
  [TextDecorator.Fade]: css`
    opacity: 0.6;
  `,
  [TextDecorator.Invert]: css`
    color: ${getColor("white")};
  `,
}
