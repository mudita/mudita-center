/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useId, useState, FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { useFormContext } from "react-hook-form"
import { APIFC, IconType } from "generic-view/utils"
import { IconButton } from "../../../../shared/button"
import { Icon } from "../../../../icon/icon"
import Tooltip from "../../../tooltip/tooltip"
import { Typography } from "../../../../typography"

interface Props {
  name: string
  type: "text" | "email" | "tel" | "url"
  onSetDefault: () => void
}

export const DynamicTextInput: FunctionComponent<Props> = ({
  name,
  type,
  onSetDefault,
}) => {
  const id = useId()
  const { register, watch, setValue } = useFormContext()
  const value = (watch(name) as string) || ""
  const isDefault = watch(`${name}-isDefault`) || false
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (watch(`${name}-isDefault`) === undefined) {
      setValue(`${name}-isDefault`, false)
    }
  }, [])

  useEffect(() => {
    if (name) {
      setValue(`${name}-value`, value)
    }
  }, [name, value, setValue])

  useEffect(() => {
    if (!isDefault) {
      setIsFocused(false)
    }
  }, [isDefault])

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget

    setTimeout(() => {
      if (target && !target.parentElement?.contains(e.relatedTarget)) {
        setIsFocused(false)
      }
    }, 50)
  }

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          id={"input-" + id}
          type={type}
          {...register(`${name}-value`)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {(isFocused || isDefault) && (
          <Tooltip
            config={{
              placement: "bottom-left",
              strategy: "element-oriented",
              offset: { x: 0, y: 8 },
            }}
          >
            <Tooltip.Anchor>
              <DefaultButton type={"button"} onClick={onSetDefault}>
                {!isDefault && isFocused && (
                  <ButtonWrapper>
                    <span>Set as default</span>
                    <Icon
                      config={{
                        type: IconType.CheckCircle,
                        size: "tiny",
                      }}
                    />
                  </ButtonWrapper>
                )}
                {isDefault && (
                  <Icon
                    config={{
                      type: IconType.Checkmark,
                      size: "tiny",
                    }}
                  />
                )}
              </DefaultButton>
            </Tooltip.Anchor>
            {!isDefault && isFocused && (
              <Tooltip.Content>
                <Label>Set as default for this contact</Label>
                <Typography.P5>
                  Always send calls and SMS to this number.
                </Typography.P5>
              </Tooltip.Content>
            )}
          </Tooltip>
        )}
      </InputWrapper>
    </Wrapper>
  )
}

export default DynamicTextInput

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const inputFocusStyles = css`
  border-color: ${({ theme }) => theme.color.black};
`

const Input = styled.input`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  padding: 1rem 1.4rem;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey4};
  border-radius: 0px 4px 4px 0px;
  box-sizing: content-box;
  flex: 1;
  outline: none;
  transition: border-bottom-color 0.2s ease-in-out;

  &:focus {
    ${inputFocusStyles};
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;

  &:hover {
    ${Input} {
      ${inputFocusStyles};
    }
  }

  button {
    margin-left: -3.2rem;
  }
`

const DefaultButton = styled(IconButton)`
  position: absolute;
  min-width: max-content;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.label};

  &:hover {
    color: ${({ theme }) => theme.color.black};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  /* margin-right: 0.8rem; */
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.paragraph5};
  line-height: ${({ theme }) => theme.lineHeight.paragraph5};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.05em;
`
