import { FlattenInterpolation, ThemeProps } from "styled-components"
import { theme } from "Theme/theme-provider"

export type TextDecorators = FlattenInterpolation<ThemeProps<typeof theme>>
