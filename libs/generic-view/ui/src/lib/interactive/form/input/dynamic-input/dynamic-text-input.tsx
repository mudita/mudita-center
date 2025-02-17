/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useId, useState, FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useFormContext } from "react-hook-form"
import { IconType } from "generic-view/utils"
import { IconButton } from "../../../../shared/button"
import { Icon } from "../../../../icon/icon"
import Tooltip from "../../../tooltip/tooltip"
import { Typography } from "../../../../typography"

interface Props {
  name: string
  type: "text" | "email" | "tel" | "url"
  isDefault: boolean
  tooltip: {
    title: string
    content: string
  }
  onSetDefault: () => void
}

export const DynamicTextInput: FunctionComponent<Props> = ({
  name,
  type,
  isDefault,
  tooltip,
  onSetDefault,
}) => {
  const id = useId()
  const { register, watch, setValue } = useFormContext()
  const value = watch(`${name}-value`) || ""
  const formIsDefault = watch(`${name}-isDefault`)
  const [isFocused, setIsFocused] = useState(false)

  const messages = defineMessages({
    default: {
      id: "component.dynamicInput.default",
    },
  })

  useEffect(() => {
    if (name) {
      setValue(`${name}-value`, value)
    }
  }, [name, value, setValue])

  useEffect(() => {
    if (!formIsDefault) {
      setIsFocused(false)
    }
  }, [formIsDefault])

  useEffect(() => {
    setValue(`${name}-isDefault`, isDefault ?? false)
  }, [name, isDefault, setValue])

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
          id={`input-${id}`}
          type={type}
          {...register(`${name}-value`)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {(isFocused || formIsDefault) && (
          <Tooltip
            config={{
              placement: "bottom-left",
              strategy: "element-oriented",
              offset: { x: 0, y: 8 },
            }}
          >
            <Tooltip.Anchor>
              <DefaultButton type="button" onClick={onSetDefault}>
                {!formIsDefault && isFocused && (
                  <ButtonWrapper>
                    <span>{intl.formatMessage(messages.default)}</span>
                    <Icon
                      config={{
                        type: IconType.CheckCircle,
                        size: "small",
                      }}
                    />
                  </ButtonWrapper>
                )}
                {formIsDefault && (
                  <Icon
                    config={{
                      type: IconType.Checkmark,
                      size: "small",
                    }}
                  />
                )}
              </DefaultButton>
            </Tooltip.Anchor>
            {!formIsDefault && isFocused && (
              <Tooltip.Content>
                <CustomTooltip>
                  <Label>{tooltip.title}</Label>
                  <TooltipContent>{tooltip.content}</TooltipContent>
                </CustomTooltip>
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
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  border-radius: 0 0.4rem 0.4rem 0;
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
  margin-right: 0.6rem;

  &:hover {
    color: ${({ theme }) => theme.color.black};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  line-height: normal;
`

const Label = styled(Typography.P5)`
  color: ${({ theme }) => theme.color.grey1};
`

const TooltipContent = styled(Typography.P5)`
  font-weight: 300;
  color: ${({ theme }) => theme.color.grey1};
`

const CustomTooltip = styled.div`
  width: 18rem;
  padding: 0.6rem 0;
`
