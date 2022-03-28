/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { IconSize } from "App/renderer/components/core/icon/icon.component"

export const ModalText = styled(Text)`
  text-align: center;
`

export const SelectedText = styled(Text)`
  text-align: right;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 4rem;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-bottom: 1.6rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  div {
    margin-bottom: 1.6rem;
  }
`

export const SyncButton = styled(Button).attrs(({ displayStyle }) => ({
  displayStyle: displayStyle || DisplayStyle.Primary,
  iconSize: IconSize.Medium,
}))`
  width: 24rem;
  position: relative;

  > span {
    position: absolute;
    top: 0.6rem;
    left: 0.8rem;
  }
`
