/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SelectInput, Select } from "../select-input"
import DynamicTextInput from "./dynamic-text-input"

interface Props {
  name: string
  options: string[]
  type: "text" | "email" | "tel" | "url"
  onSetDefault: () => void
  placeholder: string
  tooltip: {
    title: string
    content: string
  }
  data: {
    type: string
    value: string
    isDefault: boolean
  }
}

export const DynamicInputRow: FunctionComponent<Props> = ({
  name,
  options,
  type,
  data,
  placeholder,
  tooltip,
  onSetDefault,
}) => (
  <Wrapper>
    <DynamicSelectInput
      config={{ name: `${name}-select`, options }}
      data={{ option: data.type }}
    />
    <DynamicTextInput
      name={name}
      type={type}
      isDefault={data.isDefault}
      onSetDefault={onSetDefault}
      placeholder={placeholder}
      tooltip={tooltip}
    />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
`

const DynamicSelectInput = styled(SelectInput)`
  ${Select} {
    border-radius: 0.4rem 0 0 0.4rem;
    border-right: none;
  }
`
