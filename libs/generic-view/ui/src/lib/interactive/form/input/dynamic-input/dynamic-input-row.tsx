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
  onSetDefault,
}) => {
  return (
    <Wrapper>
      <DynamicSelectInput
        config={{ name: `${name}-select`, options }}
        data={{ value: data.type }}
      />
      <DynamicTextInput
        name={`${name}`}
        type={type}
        onSetDefault={onSetDefault}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const DynamicSelectInput = styled(SelectInput)`
  ${Select} {
    border-radius: 0.4rem 0px 0px 0.4rem;
    border-right: none;
  }
`
