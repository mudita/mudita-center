/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import Button from "Renderer/components/core/button/button.component"

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

export const SyncButton = styled(Button)`
  width: 24.4rem;
  position: relative;

  > span {
    position: absolute;
    top: 0.6rem;
    left: 1.6rem;
  }
  > p {
    padding-left: 3rem;
  }
`
