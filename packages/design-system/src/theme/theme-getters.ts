import { theme } from "Theme/theme-provider"

type Theme = typeof theme

export const getColor = (name: keyof Theme["color"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.color[name]

export const getSpacing = (name: keyof Theme["spacing"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.spacing[name]

export const getFontSize = (name: keyof Theme["fontSize"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.fontSize[name]

export const getFontWeight = (name: keyof Theme["fontWeight"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.fontWeight[name]
