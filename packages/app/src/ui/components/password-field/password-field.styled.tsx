/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import InputComponent from "Renderer/components/core/input-text/input-text.component"

export const FormInputLabel = styled(Text)<{ withError?: boolean }>`
  color: ${({ theme, withError }) =>
    withError ? theme.color.text.error : theme.color.text.primary};
`

export const FormInput = styled(InputComponent)`
  max-width: calc(100% - 1rem);
  padding: 0.6rem 0;
`

export const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 3.6rem;
`

export const IconWrapper = styled.div`
  position: absolute;
  top: -33%;
  right: 0;
  display: flex;
  align-items: center;
  padding-top: 1rem;
`
