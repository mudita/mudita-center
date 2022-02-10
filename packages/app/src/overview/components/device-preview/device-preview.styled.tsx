/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Card, {
  CardAction,
  CardContent,
} from "App/overview/components/card.elements"
import { borderColor } from "App/renderer/styles/theming/theme-getters"

export const PhoneCard = styled(Card)`
  grid-template-areas: "Text" "Buttons";
  grid-template-columns: 1fr;
  height: 100%;
  padding: 8rem 0 0;
  justify-items: center;
  ${CardAction} {
    justify-self: center;
    display: flex;
    align-items: flex-end;
    margin-top: auto;
    margin-bottom: "2.4rem"};
    padding: 0 5.3rem;
  }
`

export const PhoneInfo = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5.3rem;
  margin-bottom: 4rem;
  img {
    height: 29.7rem;
  }
`

export const HarmonyInfo = styled(PhoneInfo)`
  margin-bottom: 12rem;
`

export const PureSystemButtonContainer = styled.div`
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  border-top: 0.1rem solid ${borderColor("separator")};
`
