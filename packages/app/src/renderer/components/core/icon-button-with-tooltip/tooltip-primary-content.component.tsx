/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { IconButtonWithTooltipTestIds } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"

interface Props {
  className?: string
  title?: MessageInterface
  description: MessageInterface
}

const Content = styled.div`
  width: max-content;
  max-width: 24.3rem;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
`

const Title = styled(Text)`
  margin-bottom: 0.8rem;
`

export const TooltipPrimaryContent: FunctionComponent<Props> = ({
  title,
  description,
  ...props
}) => {
  return (
    <Content {...props}>
      {title && (
        <Title
          displayStyle={TextDisplayStyle.Paragraph3}
          element={"p"}
          message={title}
        />
      )}
      {description && (
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          element={"p"}
          message={description}
          data-testid={IconButtonWithTooltipTestIds.Description}
        />
      )}
    </Content>
  )
}
