import { FlattenInterpolation, ThemeProps } from "styled-components"
import { theme } from "Theme/theme-provider"

export type Decorators = FlattenInterpolation<ThemeProps<typeof theme>>
