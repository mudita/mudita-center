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
import { useFormContext } from "react-hook-form"
import { Typography } from "../../../../typography"

export const DynamicInputList: APIFC<
  FormDynamicInputData,
  FormDynamicInputConfig
> = ({ data, config }) => {
  const { getValues, setValue } = useFormContext()

  useEffect(() => {
    data?.values.forEach((value, index) =>
      setValue(`${config.name}-${index}-value`, value.value)
    )
  }, [data, setValue, config.name])

  const handleSetDefault = (index: number) => {
    const formValues = getValues()

    console.log(formValues)

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
