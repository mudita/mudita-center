/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { textColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import UpdateButtonComponent from "App/__deprecated__/renderer/components/rest/news/update-button/update-button.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  strong {
    color: ${textColor("primary")};
  }
`

export const ModalText = styled(Text)`
  text-align: center;
  margin-top: 1.2rem;
`

export const ModalSubText = styled(Text)`
  margin-top: 4.8rem;
  margin-bottom: 1.6rem;
`

export const RefreshButton = styled(UpdateButtonComponent)`
  width: 17rem;
`

export const EventsText = styled(ModalText)`
  width: 23rem;
`

export const WideButton = styled(ButtonComponent)`
  width: auto;
`
