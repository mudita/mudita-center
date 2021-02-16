/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Button from "Renderer/components/core/button/button.component"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"

export const HelpButton = styled(Button)`
  padding: 0.4rem 0.8rem;
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.4rem 0 1.6rem 0;
`

export const HeaderIconContainer = styled.div`
  display: flex;
`

export const HeaderIconBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  &:hover {
    background-color: ${backgroundColor("minor")};
  }
`

export const HiddenIconBg = styled(HeaderIconBg)`
  visibility: hidden; /* TODO: Remove component and logic associated with it when features become available in menu */
`

export const HeaderIcon = styled(Icon)`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`

export const LinkWrapper = styled.div`
  margin: 0 1rem 0.4rem 1rem;
`
