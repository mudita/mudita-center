/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
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
import SelectionManager from "Core/__deprecated__/renderer/components/core/selection-manager/selection-manager.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

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
  selectionMessage: {
    id: "module.quotations.selectedState.count",
  },
  selectionDeleteButton: {
    id: "module.quotations.selectedState.deleteButton",
  },
})

interface Props {
  onSettingsClick?: VoidFunction
  onAddClick?: VoidFunction
  onDeleteClick?: VoidFunction
  showAddButton?: boolean
  selectedItemsNumber?: number
  allItemsSelected?: boolean
  onAllItemsToggle?: VoidFunction
}

export const TopBar: FunctionComponent<Props> = ({
  showAddButton,
  onAddClick,
  onDeleteClick,
  onSettingsClick,
  selectedItemsNumber = 0,
  allItemsSelected,
  onAllItemsToggle,
}) => {
  return (
    <Wrapper $showSelectionManager={selectedItemsNumber > 0}>
      <StyledSelectionManager
        selectedItemsNumber={selectedItemsNumber}
        allItemsSelected={allItemsSelected}
        message={messages.selectionMessage}
        onToggle={onAllItemsToggle}
        buttons={[
          <ButtonComponent
            key={"delete"}
            displayStyle={DisplayStyle.Link}
            Icon={IconType.Delete}
            label={intl.formatMessage(messages.selectionDeleteButton)}
            onClick={onDeleteClick}
          />,
        ]}
      />
      <Header>
        <Text
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
      </Header>
    </Wrapper>
  )
}

const StyledSelectionManager = styled(SelectionManager)`
  z-index: 1;
  position: absolute;
  width: calc(100% - 6.4rem);

  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: 1;
  visibility: visible;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`

const Wrapper = styled.div<{ $showSelectionManager: boolean }>`
  padding: 3.6rem 3.2rem;
  position: relative;

  ${({ $showSelectionManager }) =>
    $showSelectionManager &&
    css`
      ${StyledSelectionManager} {
        opacity: 1;
        visibility: visible;
      }
      ${Header} {
        opacity: 0;
        visibility: hidden;
      }
    `}
`

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
