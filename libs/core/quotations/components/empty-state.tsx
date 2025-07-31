/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"

const messages = defineMessages({
  title: {
    id: "module.quotations.emptyState.title",
  },
  description: {
    id: "module.quotations.emptyState.description",
  },
  addButton: {
    id: "module.quotations.header.addButton",
  },
})

interface Props {
  onAddClick: VoidFunction
}

export const EmptyState: FunctionComponent<Props> = ({ onAddClick }) => {
  return (
    <Wrapper>
      <RoundIcon>
        <Icon type={IconType.Quotations} size={IconSize.Enormous} />
      </RoundIcon>
      <Description>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.title}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          color={"secondary"}
          message={messages.description}
        />
      </Description>
      <AddButton
        onClick={onAddClick}
        labelMessage={messages.addButton}
        Icon={IconType.PlusSign}
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

const AddButton = styled(ButtonComponent)`
  width: 15.6rem;
`
