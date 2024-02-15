/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
  fontWeight,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"

const baseContainerStyles = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

export const Container = styled.section`
  display: grid;
  grid-template-areas: "Content" "ButtonsContainer";
  grid-row-gap: 0;
  grid-template-rows: auto 13.2rem;
  width: 100%;
`

export const Content = styled.div`
  ${baseContainerStyles};
  grid-area: Content;
  justify-content: space-between;
  background-color: ${backgroundColor("main")};
`

export const ContentTop = styled.div`
  max-width: 107.2rem;
  margin: 8rem auto 4rem auto;
  text-align: center;
`

export const HeaderTitle = styled(Text)`
  font-size: 4.8rem;
  line-height: 4.8rem;
  margin-bottom: 0.4rem;
`
export const SubheaderTitle = styled(Text)`
  font-size: 2.2rem;
  font-weight: ${fontWeight("light")};
  color: ${textColor("info")};
`

export const ContentBottom = styled.div``

export const DeviceNames = styled(Text)`
  margin-bottom: -1rem;
`

export const DeviceName = styled.span`
  padding: 0 1.7rem;

  &:not(:first-child) {
    padding-left: 1.6rem;
    border-left: 0.1rem solid ${borderColor("verticalSeparator")};
  }
`

export const ImageWrapper = styled.div`
  ${baseContainerStyles};
  max-width: 99rem;
  justify-content: center;
  margin-bottom: 2rem;
`

export const ButtonsContainer = styled.div`
  ${baseContainerStyles};
  grid-area: ButtonsContainer;
  margin-top: 3.6rem;
`

export const CancelButton = styled(ButtonComponent)``

export const TroubleshootingButton = styled(ButtonComponent)`
  display: block;
  margin-top: 0.3rem;
  width: fit-content;
`
