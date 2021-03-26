import React from "react"
import { AppFunctionComponent } from "@mudita/app-function-component"
import { ButtonProps } from "Components/button/button.interface"

export const Button: AppFunctionComponent<ButtonProps> = ({
  primary,
  backgroundColor,
  size,
  label,
  ...props
}: any) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary"
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  )
}
