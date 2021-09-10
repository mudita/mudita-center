/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderColor,
} from "App/renderer/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "App/renderer/components/core/text/text.component"
import ButtonComponent from "App/renderer/components/core/button/button.component"

export const BackWrapper = styled.div`
  background-color: ${backgroundColor("row")};
  border-bottom: 0.1rem solid ${borderColor("separator")};
  padding: 2.4rem 0 1.5rem 4rem;
`

export const PureSystemSection = styled.div`
  padding: 3.2rem 3rem 3.2rem 4rem;
  :not(:last-of-type) {
    border-bottom: 0.1rem solid ${borderColor("separator")};
  }
`

export const PureSystemTitle = styled(Text)`
  margin-bottom: 1.6rem;
`

export const PureSystemAbout = styled(Text)`
  margin-bottom: 2.4rem;
`

export const PureSystemInfoContainer = styled.div<{
  withButton: boolean
}>`
  padding: 2.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${backgroundColor("row")};
  border-radius: 0.4rem;
  padding: ${({ withButton }) => (withButton ? "1.2rem 2.4rem" : "2.4rem")};
  :not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`

export const SarButtonComponent = styled(ButtonComponent)`
  width: auto;
`
