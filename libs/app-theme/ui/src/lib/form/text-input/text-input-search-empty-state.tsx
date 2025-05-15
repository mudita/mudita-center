/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { styled } from "styled-components"
import { Icon } from "../../icon/icon"
import { IconSize, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  text: {
    id: "general.components.searchInput.emptyState",
  },
})

interface Props {
  text?: string
}

export const TextInputSearchEmptyState: FunctionComponent<Props> = ({
  text,
}) => {
  return (
    <EmptyStateWrapper>
      <EmptyStateIcon type={IconType.Search} size={IconSize.Big} />
      <p>{text || formatMessage(messages.text)}</p>
    </EmptyStateWrapper>
  )
}

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 1.6rem;
  gap: 0.6rem;

  p {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
    letter-spacing: 0.05em;
    margin: 0;
  }
`

const EmptyStateIcon = styled(Icon)``
