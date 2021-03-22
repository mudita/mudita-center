import { theme } from "Theme/theme-provider"

type Theme = typeof theme

export const color = (name: keyof Theme["color"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.color[name]

export const spacing = (name: keyof Theme["spacing"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.spacing[name]

export const fontSize = (name: keyof Theme["fontSize"]) => ({
  theme,
}: {
  theme: Theme
}): string => theme.fontSize[name]
