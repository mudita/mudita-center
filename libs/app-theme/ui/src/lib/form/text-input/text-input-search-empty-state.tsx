/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { styled } from "styled-components"
import { Icon } from "../../icon/icon"
import { IconSize, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Typography } from "../../typography/typography"

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
      <Typography.P3 color={"black"}>
        {text || formatMessage(messages.text)}
      </Typography.P3>
    </EmptyStateWrapper>
  )
}

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.6rem 2.3rem;
`

const EmptyStateIcon = styled(Icon)`
  margin: 0.6rem;
`
