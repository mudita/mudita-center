/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { ButtonType, IconSize, IconType } from "app-theme/models"
import { borderColor } from "app-theme/utils"
import { Button, SelectionManager, Typography } from "app-theme/ui"
import { quotationsMessages } from "./quotations.messages"

interface Props {
  onSettingsClick?: VoidFunction
  onAddClick?: VoidFunction
  onDeleteClick?: VoidFunction
  showAddButton?: boolean
  selectedItemsNumber?: number
  allItemsSelected?: boolean
  onAllItemsToggle?: VoidFunction
}

export const QuotationsTopBar: FunctionComponent<Props> = ({
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
        message={quotationsMessages.selectionMessage}
        onToggle={onAllItemsToggle}
        buttons={[
          <Button
            key={"delete"}
            type={ButtonType.Text}
            icon={IconType.Trash}
            message={quotationsMessages.selectionDeleteButton.id}
            onClick={onDeleteClick}
          />,
        ]}
      />
      <Header>
        <Typography.H3 message={quotationsMessages.title.id} />
        <ButtonsWrapper $singleColumn={!showAddButton}>
          <Button
            onClick={onSettingsClick}
            type={ButtonType.Secondary}
            message={quotationsMessages.settingsButton.id}
            icon={IconType.Options}
            iconSize={IconSize.Medium}
          />
          {showAddButton && (
            <Button
              onClick={onAddClick}
              type={ButtonType.Primary}
              message={quotationsMessages.addButton.id}
              icon={IconType.Plus}
              iconSize={IconSize.Medium}
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
  padding-left: 1.2rem;
  border-color: ${borderColor("secondary")};
  gap: 1.4rem;

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
