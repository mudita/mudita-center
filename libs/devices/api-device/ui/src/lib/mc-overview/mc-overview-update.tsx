/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Icon, Typography } from "app-theme/ui"
import { ButtonTextModifier, ButtonType, IconType } from "app-theme/models"
import { McOverview } from "devices/api-device/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  howToUpdateButtonLabel: {
    id: "apiDevice.overview.updateSection.howToUpdateButton",
  },
})

type Props = Pick<NonNullable<McOverview["update"]>, "version">

export const McOverviewUpdate: FunctionComponent<Props> = ({ version }) => {
  return (
    <Wrapper>
      <Info>
        <Typography.P3>{version.label}</Typography.P3>
        <Typography.P1 color={"black"}>{version.value}</Typography.P1>
      </Info>
      <HelpButton
        type={ButtonType.Text}
        modifiers={[
          ButtonTextModifier.Link,
          ButtonTextModifier.DefaultCase,
          ButtonTextModifier.HoverUnderline,
        ]}
      >
        <HelpIcon type={IconType.Info} />
        {formatMessage(messages.howToUpdateButtonLabel)}
      </HelpButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`

const HelpButton = styled(Button)`
  flex: 0;
  align-self: flex-end;
  justify-self: flex-end;
  letter-spacing: 0.04em;
  height: 2.4rem;
`

const HelpIcon = styled(Icon)`
  path {
    stroke: currentColor;
    stroke-width: 0.25rem;

    &:first-of-type {
      stroke-width: 0.15rem;
    }
  }
`
