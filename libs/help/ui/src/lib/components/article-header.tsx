/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { useHistory } from "react-router"
import { ButtonText, H3 } from "generic-view/ui"

interface Props {
  title: string
}

export const ArticleHeader: FunctionComponent<Props> = ({ title }) => {
  const history = useHistory()
  const goBack = () => history.goBack()
  return (
    <Wrapper>
      <ButtonText
        config={{
          text: "Back",
          action: {
            type: "custom",
            callback: goBack,
          },
          icon: IconType.ArrowBack,
          modifiers: ["uppercase"],
        }}
      />
      <H3>{title}</H3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.6rem;
  padding: 1.8rem 3.2rem 1.7rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey4};
`
