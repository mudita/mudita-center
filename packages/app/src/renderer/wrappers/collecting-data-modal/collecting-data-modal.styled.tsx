/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import ButtonComponent from "App/renderer/components/core/button/button.component"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Paragraph = styled(Text)`
  white-space: pre-wrap;
  text-align: center;
  line-height: 2.2rem;
  margin-top: 1.2rem;
`
export const FullAgreementButton = styled(ButtonComponent)`
  width: auto;
  height: 2rem;
  padding: 0;
  &:hover {
    background-color: transparent;
  }

  p {
    text-transform: none;
  }
`
