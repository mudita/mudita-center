/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"

export const BackWrapper = styled.div`
  background-color: ${backgroundColor("row")};
  border-bottom: 0.1rem solid ${borderColor("separator")};
  padding: 0.9rem 0 0.9rem 3.2rem;
`

export const PureSystemSection = styled.div`
  padding: 3.2rem;
  :not(:last-of-type) {
    border-bottom: 0.1rem solid ${borderColor("separator")};
  }
`

export const PureSystemTitle = styled(Text)`
  margin-bottom: 0.8rem;
`

export const PureSystemAbout = styled(Text)`
  margin-bottom: 1.6rem;
`

export const PureSystemInfoContainer = styled.div<{
  withButton: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${backgroundColor("row")};
  border-radius: ${borderRadius("medium")};
  padding: ${({ withButton }) =>
    withButton ? "1.2rem 2.4rem" : "2.2rem 2.4rem 1.8rem"};
  :not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`

export const AutoWidthButtonComponent = styled(ButtonComponent)`
  width: auto;
`
