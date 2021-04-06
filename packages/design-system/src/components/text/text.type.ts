import { FlattenInterpolation, ThemeProps } from "styled-components"
import { theme } from "../.."

export type TextDecorators = FlattenInterpolation<ThemeProps<typeof theme>>
