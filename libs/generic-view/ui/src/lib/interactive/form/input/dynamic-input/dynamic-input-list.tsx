/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FormDynamicInputConfig,
  FormDynamicInputData,
} from "generic-view/models"
import { APIFC } from "generic-view/utils"
import React, { useEffect } from "react"
import styled from "styled-components"
import { DynamicInputRow } from "./dynamic-input-row"
import { useFormContext, useWatch } from "react-hook-form"
import { Typography } from "../../../../typography"

export const DynamicInputList: APIFC<
  FormDynamicInputData,
  FormDynamicInputConfig
> = ({ data, config }) => {
  const { setValue } = useFormContext()
  const formValues = useWatch()

  useEffect(() => {
    data?.values.forEach((value, index) => {
      setValue(`${config.name}-${index}-value`, value.value)
      setValue(`${config.name}-${index}-select`, value.type)
    })
  }, [data, setValue, config.name])

  useEffect(() => {
    const inputKeys = Object.keys(formValues).filter((key) =>
      key.endsWith("-value")
    )

    const defaultKey = Object.keys(formValues).find(
      (key) => key.endsWith("-isDefault") && formValues[key]
    )

    if (defaultKey) {
      const correspondingValueKey = defaultKey.replace("-isDefault", "-value")
      const currentValue = formValues[correspondingValueKey]?.trim()

      if (!currentValue) {
        const newDefaultKey = inputKeys.find(
          (key) => key !== correspondingValueKey && formValues[key]?.trim()
        )

        if (newDefaultKey) {
          setValue(defaultKey, false)
          setValue(newDefaultKey.replace("-value", "-isDefault"), true)
        }
      }
    } else {
      const firstFilledKey = inputKeys.find((key) => formValues[key]?.trim())

      if (firstFilledKey) {
        setValue(firstFilledKey.replace("-value", "-isDefault"), true)
      }
    }
  }, [formValues, setValue])

  const handleSetDefault = (index: number) => {
    Object.entries(formValues).forEach(([key, _]) => {
      if (key.endsWith("-isDefault")) {
        setValue(key, false)
      }
    })

    setValue(`${config.name}-${index}-isDefault`, true)
  }

  return (
    <ListWrapper>
      <Label>{config.label}</Label>
      {data?.values.map((value, index) => (
        <DynamicInputRow
          key={index}
          name={`${config.name}-${index}`}
          options={config.typeOptions}
          type={config.inputType}
          data={value}
          placeholder={config.inputPlaceholder}
          onSetDefault={() => handleSetDefault(index)}
          tooltip={{
            title: config.tooltip.title,
            content: config.tooltip.content,
          }}
        />
      ))}
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Label = styled(Typography.P3)`
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.07rem;
`
