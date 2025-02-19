/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import MenuItemButton from "Core/__deprecated__/renderer/components/rest/menu-item-button.component"
import { borderColor, borderRadius } from "Core/core/styles/theming/theme-getters"

export const SubitemWrapper = styled.div`
  display: flex;
`

export const SubitemButton = styled(MenuItemButton)`
  padding-left: 1rem;
  width: auto;
  flex: 1;
  margin-bottom: 0.4rem;
`
export const SubitemEmptyBox = styled.div`
  height: 1rem;
  width: auto;
  flex: 1;
`

export const SubitemBranchMarkerWrapper = styled.div`
  width: 3.6rem;
  display: flex;
  justify-content: end;
  padding-right: 0.4rem;
  box-sizing: border-box;
  align-items: center;
`

export const SubitemBranchMarkerVerticalLine = styled.div`
  width: 0.1rem;
  height: 100%;
  background-color: ${borderColor("separator")};
`

export const SubitemBranchMarkerHorizontalLine = styled.div<{
  transparent?: boolean
}>`
  width: 1.2rem;
  height: 0.1rem;
  margin-bottom: 0.2rem;
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : borderColor("separator")};
`

export const LastSubitemBranchMarkerWrapper = styled(
  SubitemBranchMarkerWrapper
)`
  align-items: flex-start;
`

export const LastSubitemBranchMarker = styled.div`
  width: 1.2rem;
  height: calc(50% - 0.2rem);
  border-left: 0.1rem solid ${borderColor("separator")};
  border-bottom: 0.1rem solid ${borderColor("separator")};
  border-bottom-left-radius: ${borderRadius("medium")};
`
