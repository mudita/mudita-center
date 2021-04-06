import React from "react"
import { AppFunctionComponent } from "@mudita/app-function-component"
import { TextDecorator, TextVariant } from "./text.enum"
import { TextStyleProps } from "./text.interface"
import { textDecorators, textVariants } from "./text.helpers"
import { TextWrapper } from "./text.styled"

interface Props extends TextStyleProps {
  variant?: TextVariant
  decorators?: TextDecorator[]
}

export const Text: AppFunctionComponent<Props> = ({
  variant,
  decorators,
  children,
  ...props
}) => {
  const { tag = "p", size = "16", color = "black", weight = "normal" } = {
    ...(variant !== undefined ? textVariants[variant] : {}),
    ...props,
  }

  const decoratorsStyles = decorators?.map(
    (decorator) => textDecorators[decorator]
  )

  return (
    <TextWrapper
      {...props}
      as={tag}
      size={size}
      color={color}
      weight={weight}
      decorators={decoratorsStyles}
    >
      {children}
    </TextWrapper>
  )
}
