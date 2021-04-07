import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react"
import mergeRefs from "react-merge-refs"
import { AppFunctionComponent } from "@mudita/app-function-component"
import {
  CheckboxWrapper,
  CheckedIcon,
  CustomInput,
  IndeterminateIcon,
  NativeInput,
  LabelText,
} from "./checkbox.styled"
import { CheckboxSize, TestId } from "./checkbox.enum"
import { getLabelTextVariant } from "./checkbox.helpers"

type CheckboxProps = Partial<
  Omit<InputHTMLAttributes<unknown>, "size" | "type">
>

export interface Props extends CheckboxProps {
  size?: CheckboxSize
  indeterminate?: boolean
  ref?: ForwardedRef<HTMLInputElement>
}

const CheckboxComponent: AppFunctionComponent<Props> = ({
  size = CheckboxSize.Basic,
  className,
  children,
  indeterminate,
  ref,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const refs = mergeRefs([inputRef, ...(ref ? [ref] : [])])

  const simpleLabel = ["string", "number"].includes(typeof children)
  const labelVariant = simpleLabel ? getLabelTextVariant(size) : undefined

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  return (
    <CheckboxWrapper className={className}>
      <NativeInput {...rest} onChange={handleChange} ref={refs} />
      <CustomInput size={size} data-testid={TestId.Icon}>
        <CheckedIcon data-testid={TestId.CheckedIcon} />
        <IndeterminateIcon data-testid={TestId.IndeterminateIcon} />
      </CustomInput>
      {simpleLabel ? (
        <LabelText
          variant={labelVariant}
          tag={"span"}
          checkboxSize={size}
          data-testid={TestId.Label}
        >
          {children}
        </LabelText>
      ) : (
        children
      )}
    </CheckboxWrapper>
  )
}

export const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <CheckboxComponent {...props} ref={ref} />
))
