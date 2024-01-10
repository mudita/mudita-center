/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Card, { CardContent } from "Core/overview/components/card.elements"
import { borderColor } from "Core/core/styles/theming/theme-getters"

export const PhoneCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 60rem;
`

export const DeviceCardContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const DeviceInfo = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5.3rem;
  margin-bottom: 3rem;
  img {
    max-height: 29.7rem;
    max-width: 20.5rem;
  }
`

export const PureSystemButtonContainer = styled.div`
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  border-top: 0.1rem solid ${borderColor("separator")};
  width: 100%;
`

export const SerialNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  :first-child {
    margin-bottom: 0.8rem;
  }
`
