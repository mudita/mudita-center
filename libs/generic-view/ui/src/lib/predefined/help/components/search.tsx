/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { H3 } from "../../../texts/headers"
import { P3 } from "../../../texts/paragraphs"
import SearchInput from "../../../interactive/form/input/search-input"
import { theme } from "generic-view/theme"

const messages = defineMessages({
  title: {
    id: "module.help.search.title",
  },
  description: {
    id: "module.help.search.description",
  },
  placeholder: {
    id: "module.help.search.placeholder",
  },
})

export const Search: FunctionComponent = () => {
  return (
    <Wrapper>
      <H3>{intl.formatMessage(messages.title)}</H3>
      <P3>{intl.formatMessage(messages.description)}</P3>
      <InputWrapper>
        <SearchInput
          style={{
            backgroundColor: theme.color.white,
          }}
          config={{
            name: "search",
            label: intl.formatMessage(messages.placeholder),
          }}
        />
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};
  width: 100%;
  max-width: 52.2rem;
`

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 4.1rem;
`
