import { Theme } from "./theme"

export const textColor = (name: keyof Theme["color"]["text"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.text[name]

export const backgroundColor = (name: keyof Theme["color"]["background"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.background[name]

export const borderColor = (name: keyof Theme["color"]["borderColor"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.borderColor[name]

export const opacity = (name: keyof Theme["opacity"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.opacity[name]

export const fontWeight = (name: keyof Theme["fontWeight"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.fontWeight[name]

export const font = (name: keyof Theme["font"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.font[name]

export const letterSpacing = (name: keyof Theme["letterSpacing"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.letterSpacing[name]

export const minBreakpoint = (name: keyof Theme["breakpoint"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.breakpoint[name] + "rem"

export const maxBreakpoint = (name: keyof Theme["breakpoint"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.breakpoint[name] - 0.01 + "rem"
