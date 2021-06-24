/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Card, {
  CardAction,
  CardText,
} from "Renderer/components/rest/overview/card.elements"

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

export const PhoneInfo = styled(CardText)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 24rem;
  }
`
