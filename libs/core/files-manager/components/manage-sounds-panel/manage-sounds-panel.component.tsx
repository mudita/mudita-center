/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { FilesManagerPanelProps } from "Core/files-manager/components/files-manager-panel/files-manager-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  FilesManagerSelectionManager,
} from "Core/files-manager/components/files-manager-panel/files-manager-panel.styled"
import { FilesManagerPanelTestIds } from "Core/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import FilesManagerSearchInput from "Core/files-manager/components/files-manager-search-input/files-manager-search-input"
import { activeClassName } from "Core/__deprecated__/renderer/components/core/button/button.styled.elements"
import styled from "styled-components"
import {
  resetAllItems,
  selectAllItems,
  setActiveSoundApp,
} from "Core/files-manager/actions"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import getFilesByActiveSoundAppSelector from "Core/files-manager/selectors/get-files-by-active-sound-app.selector"
import isAllFilesSelectedSelector from "Core/files-manager/selectors/is-all-files-selected.selector"
import getFilesSelectedSelector from "Core/files-manager/selectors/get-files-selected.selector"

const StyledButton = styled(Button)`
  width: auto;
  && {
    padding: 0;
  }
`

const LeftContainer = styled.div`
  display: flex;
  height: 3.4rem;

  p {
    text-transform: capitalize;
  }
  ${StyledButton} {
    margin-right: 4rem;
  }
`

const RightContainer = styled.div<{ visible: boolean }>`
  display: flex;
  visibility: ${({ visible }) => (visible ? "initial" : "hidden")};
`

const messages = defineMessages({
  uploadButton: { id: "module.manageSounds.uploadButton" },
  deleteButton: { id: "module.manageSounds.deleteButton" },
  alarmsTab: { id: "module.manageSounds.alarmsTab" },
  relaxationTab: { id: "module.manageSounds.relaxationTab" },
})

export const ManageSoundsPanel: FunctionComponent<FilesManagerPanelProps> = ({
  disabled,
  onUploadFile,
  onDeleteClick,
  searchValue,
  onSearchValueChange,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const activeSoundApp = useSelector(
    (state: ReduxRootState) => state.filesManager.activeSoundApp
  )
  const selectedItems = useSelector(getFilesSelectedSelector)
  const allItemsSelected = useSelector(isAllFilesSelectedSelector)
  const files = useSelector(getFilesByActiveSoundAppSelector)
  const noFiles = files.length === 0
  const selectedItemsCount = selectedItems.length
  const selectionMode = selectedItemsCount > 0

  const toggleAll = () => {
    dispatch(selectAllItems())
  }

  const resetRows = () => {
    dispatch(resetAllItems())
  }

  const handleSoundsButtonTabClick = () => {
    dispatch(setActiveSoundApp("HARMONY_ALARMS"))
  }

  const handleRelaxationButtonTabClick = () => {
    dispatch(setActiveSoundApp("HARMONY_RELAXATION"))
  }

  return (
    <PanelWrapper data-testid={FilesManagerPanelTestIds.Wrapper}>
      <Panel>
        {selectionMode ? (
          <FilesManagerSelectionManager
            data-testid={FilesManagerPanelTestIds.SelectionManager}
            selectedItemsNumber={selectedItemsCount}
            allItemsSelected={Boolean(allItemsSelected)}
            message={{ id: "module.filesManager.selectionNumber" }}
            checkboxSize={Size.Medium}
            onToggle={allItemsSelected ? resetRows : toggleAll}
            buttons={[
              <Button
                key="delete"
                labelMessage={messages.deleteButton}
                displayStyle={DisplayStyle.Link}
                Icon={IconType.Delete}
                onClick={onDeleteClick}
              />,
            ]}
          />
        ) : (
          <>
            <LeftContainer>
              <StyledButton
                displayStyle={DisplayStyle.Tab}
                labelMessage={messages.alarmsTab}
                className={
                  activeSoundApp === "HARMONY_ALARMS" ? activeClassName : ""
                }
                onClick={handleSoundsButtonTabClick}
              />
              <StyledButton
                displayStyle={DisplayStyle.Tab}
                labelMessage={messages.relaxationTab}
                className={
                  activeSoundApp === "HARMONY_RELAXATION" ? activeClassName : ""
                }
                onClick={handleRelaxationButtonTabClick}
              />
            </LeftContainer>
            <RightContainer visible={!noFiles}>
              <FilesManagerSearchInput
                data-testid={FilesManagerPanelTestIds.SearchInput}
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
              />
              <ButtonWrapper>
                <Button
                  data-testid={FilesManagerPanelTestIds.Button}
                  displayStyle={DisplayStyle.Primary}
                  labelMessage={messages.uploadButton}
                  onClick={onUploadFile}
                  disabled={disabled}
                />
              </ButtonWrapper>
            </RightContainer>
          </>
        )}
      </Panel>
    </PanelWrapper>
  )
}
