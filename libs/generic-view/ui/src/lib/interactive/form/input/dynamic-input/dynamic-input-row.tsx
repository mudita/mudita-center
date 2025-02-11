/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SelectInput, Select } from "../select-input"
import TextInput, { Input } from "../text-input"

interface Props {
  name: string
  options: string[]
  type: "text" | "password" | "email" | "tel" | "url"
  data: {
    type: string
    value: string
  }
}

export const DynamicInputRow: FunctionComponent<Props> = ({
  name,
  options,
  type,
  data,
}) => {
  return (
    <Wrapper>
      <DynamicSelectInput
        config={{ name: `${name}-select`, options }}
        data={{ value: data.type }}
      />
      <DynamicTextInput
        config={{
          name: `${name}-input`,
          type: type,
        }}
        data={{
          value: data.value,
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const DynamicTextInput = styled(TextInput)`
  ${Input} {
    border-radius: 0px 4px 4px 0px;
    border: 1px solid ${({ theme }) => theme.color.grey4};
    border-left: none;
    background: ${({ theme }) => theme.color.white};
    padding: 1rem 1.4rem;
    min-height: unset;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.color.grey4};
    }
  }
`

const DynamicSelectInput = styled(SelectInput)`
  ${Select} {
    border-radius: 0.4rem 0px 0px 0.4rem;
  }
`
