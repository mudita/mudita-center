/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { ModalContent, RoundIconWrapper } from "App/ui/components/modal-dialog"
import buttonComponent from "App/__deprecated__/renderer/components/core/button/button.component"

export const IconWrapper = styled(RoundIconWrapper)`
  width: 8rem;
  height: 8rem;
`

export const ContentWrapper = styled(ModalContent)`
  padding: 0 3rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
  width: 100%;
  align-items: flex-start;
  margin-top: 3.2rem;
`

export const SubmitButton = styled(buttonComponent)`
  margin-top: 2.4rem;
`
