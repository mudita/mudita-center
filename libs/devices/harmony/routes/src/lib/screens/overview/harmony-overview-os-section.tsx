/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType } from "app-theme/models"
import styled from "styled-components"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  versionLabel: {
    id: "harmony.overview.os.versionLabel",
  },
  versionText: {
    id: "harmony.overview.os.versionText",
  },
  updateCheckButton: {
    id: "harmony.overview.os.update.checkButton",
  },
})

interface Props {
  version: string
}

export const HarmonyOverviewOsSection: FunctionComponent<Props> = ({
  version,
}) => {
  return (
    <Wrapper>
      <Info>
        <Typography.P3 message={messages.versionLabel.id} />
        <TextWrapper>
          <Typography.P1
            color={"black"}
            message={messages.versionText.id}
            values={{ version }}
          />
        </TextWrapper>
      </Info>
      <Button
        type={ButtonType.Primary}
        size={ButtonSize.Medium}
        message={messages.updateCheckButton.id}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`
