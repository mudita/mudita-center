/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
  useId,
} from "react"
import styled from "styled-components"
import { Typography } from "../../typography/typography"
import { TypographyAlign } from "app-theme/models"

interface Props
  extends PropsWithChildren,
    Pick<ComponentProps<typeof Input>, "style" | "className">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "style" | "className" | "size" | "type" | "placeholder"
    > {
  ref?: Ref<HTMLInputElement>
}

export const RadioInput: FunctionComponent<Props> = ({ children, ...rest }) => {
  const id = useId()

  return (
    <Wrapper>
      <Input id={"input-" + id} type={"radio"} {...rest} />
      <Label htmlFor={"input-" + id}>
        <InputIndicator />
        {children && (
          <Typography.P1 textAlign={TypographyAlign.Left} color={"currentColor"}>
            {children}
          </Typography.P1>
        )}
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 3.2rem;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: ${({ theme }) => theme.app.color.grey1};
  letter-spacing: 0.02em;
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
  cursor: pointer;
`

const InputIndicator = styled.div`
  min-width: 2.2rem;
  min-height: 2.2rem;
  display: inline-block;
  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  margin-right: 1.4rem;
  align-self: flex-start;

  &:after {
    content: "";
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.4rem;
    background-color: ${({ theme }) => theme.app.color.grey1};
    border-radius: 50%;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`

const Input = styled.input`
  display: none;

  &:checked + ${Label} {
    ${InputIndicator} {
      &:after {
        opacity: 1;
      }
    }
  }

  &:disabled + ${Label} {
    cursor: not-allowed;
    color: ${({ theme }) => theme.app.color.grey4};
  }
`
