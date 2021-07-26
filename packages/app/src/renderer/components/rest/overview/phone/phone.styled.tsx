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
  height: 56rem;
  padding: 8rem 5.3rem 4rem;
  justify-items: center;
  ${CardAction} {
    justify-self: center;
    display: flex;
    align-items: flex-end;
    margin-top: auto;
  }
`

export const PhoneInfo = styled(CardText)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 29.7rem;
  }
`
