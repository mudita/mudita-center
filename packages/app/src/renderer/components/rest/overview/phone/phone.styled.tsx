/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import Card, {
  CardAction,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import Text from "Renderer/components/core/text/text.component"

export const PhoneCard = styled(Card)`
  grid-template-areas: "Text" "Buttons";
  grid-template-columns: 1fr;
  height: auto;
  padding: 6rem 0 6.4rem 0;
  justify-items: center;

  ${CardAction} {
    justify-self: center;
  }
`

export const PhoneDescription = styled(Text)`
  margin-top: 2.4rem;
`

export const PhoneInfo = styled(CardText)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 36rem;
  }
`

export const BatteryStats = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: hidden; /* TODO: Remove when feature becomes available */

  h2 {
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
  }
`

export const SignalStats = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 6rem;
  /* display: flex; TODO: Uncomment when feature becomes available*/
  flex-direction: column;
  align-items: center;
  display: none; /* TODO: Remove when feature becomes available */

  p {
    margin-top: 0.8rem;
  }
`
