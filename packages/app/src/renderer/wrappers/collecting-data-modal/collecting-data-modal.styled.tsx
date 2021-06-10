/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Paragraph = styled(Text)`
  white-space: pre-wrap;
  text-align: center;
  line-height: 2.2rem;
  margin-top: 3.2rem;
`
