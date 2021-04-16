import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react"
import { AppFunctionComponent } from "@mudita/app-function-component"
import { RadioSize, TestId } from "./radio.enum"
import {
  CheckedIcon,
  CustomInput,
  LabelText,
  NativeInput,
  RadioWrapper,
} from "./radio.styled"
import { getLabelTextVariant } from "./radio.helpers"

type RadioProps = Partial<Omit<InputHTMLAttributes<unknown>, "size" | "type">>

export interface Props extends RadioProps {
  size?: RadioSize
  ref?: ForwardedRef<HTMLInputElement>
  label?: string | number
}

const RadioComponent: AppFunctionComponent<Props> = ({
  className,
  children,
  size,
  ref,
  label,
  ...rest
}) => {
  const labelVariant = label ? getLabelTextVariant(size) : undefined

  return (
    <RadioWrapper className={className} data-testid={TestId.Wrapper}>
      <NativeInput {...rest} ref={ref} />
      <CustomInput size={size} data-testid={TestId.CustomInput}>
        <CheckedIcon data-testid={TestId.CheckedIcon} />
      </CustomInput>
      {label ? (
        <LabelText
          variant={labelVariant}
          tag={"span"}
          radioSize={size}
          data-testid={TestId.BasicLabel}
        >
          {label}
        </LabelText>
      ) : (
        children
      )}
    </RadioWrapper>
  )
}

export const Radio = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <RadioComponent {...props} ref={ref} />
))
