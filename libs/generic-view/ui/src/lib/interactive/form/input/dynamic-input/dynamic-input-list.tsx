/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FormDynamicInputConfig,
  FormDynamicInputData,
} from "generic-view/models"
import { APIFC } from "generic-view/utils"
import React from "react"
import styled from "styled-components"
import { DynamicInputRow } from "./dynamic-input-row"

export const DynamicInputList: APIFC<
  FormDynamicInputData,
  FormDynamicInputConfig
> = ({ data, config }) => {
  return (
    <ListWrapper>
      <Label>{config.label}</Label>
      {data?.values.map((value, index) => {
        return (
          <DynamicInputRow
            name={`${config.name}-${index}`}
            options={config.options}
            type={config.type}
            data={value}
            key={index}
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
