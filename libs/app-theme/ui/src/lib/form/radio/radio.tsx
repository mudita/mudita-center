/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor, borderColor } from "app-theme/utils"
import {
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
} from "react"
import { Typography } from "../../typography/typography"

interface Props
  extends PropsWithChildren,
    InputHTMLAttributes<HTMLInputElement> {
  className?: string
  indeterminate?: boolean
  ref?: Ref<HTMLInputElement>
  ["data-testid"]?: string
  label?: string
  subLabel?: string
}

export const Radio: FunctionComponent<Props> = ({
  className,
  children,
  label,
  subLabel,
  ...props
}) => {
  return (
    <>
      {label ? (
        <LabelWrapper>
          <Label className={className}>
            <Input {...props} type="radio" />
            <TextWrapper>
              {label && <LabelText>{label}</LabelText>}
              {subLabel && (
                <Typography.P4>{subLabel}</Typography.P4>
              )}
            </TextWrapper>
          </Label>
        </LabelWrapper>
      ) : (
        <Input {...props} type="radio" className={className} />
      )}
    </>
  )
}

const Input = styled.input`
  appearance: none;
  display: inline-block;
  outline: none;
  width: 2em;
  height: 2em;
  background-clip: content-box;
  border: 0.1rem solid ${borderColor("secondary")};
  background-color: ${backgroundColor("row")};
  border-radius: 50%;
  margin-right: 1.2rem;

  &:hover:not(:disabled) {
    border-color: ${borderColor("hover")};
    cursor: pointer;
    transition: border-color 0.5s linear;
  }

  &:checked {
    background-color: ${backgroundColor("super")};
    padding: 0.3rem;
  }
`

const Label = styled.label`
  display: flex;
  align-items: flex-start;
`

const LabelText = styled(Typography.P3)`
  margin-bottom: 0.8rem;
`

const LabelWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 1.5rem;
    margin-bottom: 0.8rem;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
