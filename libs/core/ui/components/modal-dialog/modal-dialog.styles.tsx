/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  backgroundColor,
  fontWeight,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"

export const ModalContentWithoutMargin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.6rem;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
    margin-bottom: 2.4rem;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  p + p {
    margin-top: 1.2rem;
  }
`

export const RoundIconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: ${backgroundColor("icon")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.4rem;
`

export const ModalMainText = styled(Text)`
  margin-bottom: 0.8rem;
`
export const ModalLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-weight: ${fontWeight("default")};
  color: ${textColor("action")};
`
