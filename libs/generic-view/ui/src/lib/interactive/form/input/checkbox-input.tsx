/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback, useEffect, useId, useMemo, useRef } from "react"
import styled from "styled-components"
import { CheckboxTestIds } from "e2e-test-ids"
import { APIFC, IconType, useViewFormContext } from "generic-view/utils"
import { FormCheckboxInputConfig } from "generic-view/models"
import { Icon } from "../../../icon/icon"

interface Config extends FormCheckboxInputConfig {
  onToggle?: (checked: boolean) => void
}

export const CheckboxInput: APIFC<undefined, Config> = ({
  data,
  config,
  children,
  ...props
}) => {
  const id = useId()
  const getFormContext = useViewFormContext()
  const { register, setValue, getValues, watch } = getFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const inputName = config.multipleValues
    ? `${config.name}-multiple`
    : config.name

  const fieldRegistrar = register(inputName, {
    ...config.validation,
  })

  const multiSelectValues = config.multipleValues
    ? watch(config.name)
    : undefined

  const multiSelect = useMemo(() => {
    return config.multipleValues
      ? {
          allValues: config.multipleValues,
          selectedValues: multiSelectValues,
        }
      : undefined
  }, [config.multipleValues, multiSelectValues])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      config.onToggle?.(checked)

      if (multiSelect) {
        if (
          checked ||
          (!checked &&
            multiSelect.selectedValues.length < multiSelect.allValues.length)
        ) {
          setValue(config.name, multiSelect.allValues)
        } else {
          setValue(config.name, [])
        }
      } else {
        const checkedValues = getValues(inputName)
        if (checkedValues instanceof Array) {
          setValue(
            inputName,
            checked
              ? [config.value, ...checkedValues]
              : checkedValues.filter((v: unknown) => v !== config.value)
          )
        } else {
          void fieldRegistrar.onChange(e)
        }
      }
    },
    [config, fieldRegistrar, getValues, inputName, multiSelect, setValue]
  )

  const handleRef = useCallback(
    (e: HTMLInputElement) => {
      inputRef.current = e
      fieldRegistrar.ref(e)
    },
    [fieldRegistrar]
  )

  useEffect(() => {
    if (multiSelect) {
      if (multiSelect.selectedValues.length === multiSelect.allValues.length) {
        setValue(inputName, true)
      } else {
        setValue(inputName, false)
      }
      if (inputRef.current) {
        inputRef.current.indeterminate =
          multiSelect.selectedValues.length > 0 &&
          multiSelect.selectedValues.length < multiSelect.allValues.length
      }
    }
  }, [fieldRegistrar.ref, inputName, multiSelect, setValue])

  return (
    <CheckboxInputWrapper
      {...props}
      $size={config.size}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Input
        id={"checkbox-" + id}
        data-testid={CheckboxTestIds.Checkbox}
        type={"checkbox"}
        value={config.value}
        checked={config.checked}
        disabled={config.disabled}
        {...fieldRegistrar}
        onChange={handleChange}
        ref={handleRef}
      />
      <Label htmlFor={"checkbox-" + id}>
        <InputBox>
          <HitArea htmlFor={"checkbox-" + id} />
          <CheckIcon />
          <IndeterminateIcon />
        </InputBox>
        {children || (config.label ? <span>{config.label}</span> : null)}
      </Label>
    </CheckboxInputWrapper>
  )
}

export const CheckboxInputWrapper = styled.div<{ $size: Config["size"] }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: min-content;
  height: min-content;
  max-width: 100%;
  ${({ $size }) => {
    switch ($size) {
      case "small":
        return `
        ${InputBox} {
          min-width: 1.6rem;
          min-height: 1.6rem;
          width: 1.6rem;
          height: 1.6rem;
        }
        ${CheckIcon} {
          width: 1.2rem;
          height: 1.2rem;
        }
      `
      default:
        return `
        ${InputBox} {
          min-width: 2.2rem;
          min-height: 2.2rem;
          width: 2.2rem;
          height: 2.2rem;`
    }
  }};
`

const Label = styled.label`
  color: ${({ theme }) => theme.color.grey1};
  letter-spacing: 0.02em;
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 2.2rem;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
`

const CheckIcon = styled(Icon).attrs({ data: { type: IconType.Check } })`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const IndeterminateIcon = styled(CheckIcon).attrs({
  data: { type: IconType.Minus },
})``

const InputBox = styled.div`
  min-width: 2.2rem;
  min-height: 2.2rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  margin: 0;
  transition: background-color 0.2s ease-in-out;
  box-sizing: border-box;
  position: relative;

  & + * {
    margin-left: 1.4rem;
  }

  ${CheckIcon} {
    display: flex;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }
`

const HitArea = styled.label`
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  opacity: 0.1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

const Input = styled.input<{ $withError?: boolean }>`
  display: none;

  &:checked + ${Label} {
    ${InputBox} {
      border-color: ${({ theme }) => theme.color.grey1};
      background-color: ${({ theme }) => theme.color.grey1};

      ${CheckIcon} {
        opacity: 1;
        visibility: visible;
      }

      ${IndeterminateIcon} {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  &:indeterminate + ${Label} {
    ${InputBox} {
      border-color: ${({ theme }) => theme.color.grey1};
      background-color: ${({ theme }) => theme.color.grey1};

      ${CheckIcon} {
        opacity: 0;
        visibility: hidden;
      }

      ${IndeterminateIcon} {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &:disabled + ${Label} {
    color: ${({ theme }) => theme.color.grey4};
    cursor: default;
  }
`
