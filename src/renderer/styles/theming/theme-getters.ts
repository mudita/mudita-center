import { Theme } from "./theme"

export const textColor = (name: keyof Theme["color"]["text"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.text[name]

export const hoverColor = (name: keyof Theme["color"]["hover"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.hover[name]

export const backgroundColor = (name: keyof Theme["color"]["background"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.background[name]

export const borderRadius = (name: keyof Theme["borderRadius"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.borderRadius[name]

export const borderColor = (name: keyof Theme["color"]["border"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.color.border[name]

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

export const height = (name: keyof Theme["height"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.height[name]

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

export const transitionTime = (name: keyof Theme["transitionTime"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.transitionTime[name]

export const transitionTimingFunction = (
  name: keyof Theme["transitionTimingFunction"]
) => ({ theme }: { theme: Theme }) => theme.transitionTimingFunction[name]

export const width = (name: keyof Theme["width"]) => ({
  theme,
}: {
  theme: Theme
}) => theme.width[name] + "rem"
