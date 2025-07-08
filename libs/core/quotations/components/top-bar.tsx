/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import { defineMessages } from "react-intl"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"

const messages = defineMessages({
  title: {
    id: "module.quotations.header.title",
  },
  settingsButton: {
    id: "module.quotations.header.settingsButton",
  },
  addButton: {
    id: "module.quotations.header.addButton",
  },
})

interface Props {
  onSettingsClick?: VoidFunction
  onAddClick?: VoidFunction
  showAddButton?: boolean
}

export const TopBar: FunctionComponent<Props> = ({
  showAddButton,
  onAddClick,
  onSettingsClick,
}) => {
  return (
    <Wrapper>
      <Title
        displayStyle={TextDisplayStyle.Headline3}
        message={messages.title}
      />
      <ButtonsWrapper $singleColumn={!showAddButton}>
        <ButtonComponent
          onClick={onSettingsClick}
          displayStyle={DisplayStyle.Secondary}
          labelMessage={messages.settingsButton}
          Icon={IconType.Settings}
          iconSize={IconSize.Medium}
          size={Size.Auto}
        />
        {showAddButton && (
          <ButtonComponent
            onClick={onAddClick}
            displayStyle={DisplayStyle.Primary}
            labelMessage={messages.addButton}
            Icon={IconType.PlusSign}
            iconSize={IconSize.Medium}
            size={Size.Auto}
          />
        )}
      </ButtonsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(Text)``

const ButtonsWrapper = styled.div<{ $singleColumn: boolean }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $singleColumn }) => ($singleColumn ? 1 : 2)},
    15.6rem
  );
  grid-auto-columns: auto;
  grid-auto-flow: column;
  align-items: center;
  gap: 2.4rem;
`
