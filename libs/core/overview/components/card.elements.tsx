/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
} from "Core/core/styles/theming/theme-getters"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Core/__deprecated__/renderer/components/core/button-toggler/button-toggler.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

const Card = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("row")};
`

export const CardHeader = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Headline3,
}))``

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export const CardAction = styled(ButtonToggler)`
  min-width: 17.6rem;
`

export const CardText = styled.div`
  p:not(:last-of-type) {
    margin-bottom: 0.4rem;
  }
`

export const CardActionButton = styled(ButtonTogglerItem)`
  width: 50%;
  padding: ${({ loading }) => (loading ? "0" : "0 1.6rem")};

  svg {
    height: initial;
    width: initial;
  }
`

export default Card
