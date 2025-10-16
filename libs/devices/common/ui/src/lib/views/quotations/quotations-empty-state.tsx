/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Icon, Typography } from "app-theme/ui"
import { IconSize, IconType } from "app-theme/models"
import { backgroundColor } from "app-theme/utils"
import { Messages } from "app-localize/utils"
import { quotationsMessages } from "./quotations.messages"

export interface QuotationsEmptyStateProps {
  onAddClick: VoidFunction
  messages: {
    emptyStateTitle: Messages
    emptyStateDescription: Messages
  }
}

export const QuotationsEmptyState: FunctionComponent<
  QuotationsEmptyStateProps
> = ({ onAddClick, messages }) => {
  return (
    <Wrapper>
      <RoundIcon>
        <Icon type={IconType.Quote} size={4.8} />
      </RoundIcon>
      <Description>
        <Typography.H4 message={messages.emptyStateTitle.id} />
        <Typography.P3
          color={"grey2"}
          message={messages.emptyStateDescription.id}
        />
      </Description>
      <AddButton
        onClick={onAddClick}
        message={quotationsMessages.emptyStateTddButton.id}
        icon={IconType.Plus}
        iconSize={IconSize.Medium}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 36.2rem;
  gap: 2.4rem;
  align-self: center;
  margin-bottom: 16.2rem;
`

const RoundIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.8rem;
  height: 6.8rem;
  background-color: ${backgroundColor("icon")};
  border-radius: 50%;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.8rem;
`

const AddButton = styled(Button)`
  width: 15.6rem;
`
