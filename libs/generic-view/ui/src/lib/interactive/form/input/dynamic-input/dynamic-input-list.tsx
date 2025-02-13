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

export const DynamicInputList: APIFC<
  FormDynamicInputData,
  FormDynamicInputConfig
> = ({ data, config }) => {
  const { setValue, watch } = useFormContext()
  const formValues = watch()

  useEffect(() => {
    if (data?.values) {
      data.values.forEach((value, index) => {
        setValue(`${config.name}-${index}-value`, value.value)
      })
    }
  }, [data, setValue, config.name])

  const handleSetDefault = (index: number) => {
    // data?.values.forEach((_, i) => {
    //   setValue(`${config.name}-${i}-isDefault`, i === index)
    // })

    Object.keys(formValues).forEach((key) => {
      if (key.endsWith("-isDefault")) {
        setValue(key, false)
      }
    })

    setValue(`${config.name}-${index}-isDefault`, true)
  }

  return (
    <ListWrapper>
      <Label>{config.label}</Label>
      {data?.values.map((value, index) => {
        return (
          <DynamicInputRow
            key={index}
            name={`${config.name}-${index}`}
            options={config.options}
            type={config.type}
            data={value}
            onSetDefault={() => handleSetDefault(index)}
          />
        )
      })}
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.05em;
`
