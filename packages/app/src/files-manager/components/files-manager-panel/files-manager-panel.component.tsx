/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeviceType } from "App/device/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { VisibleOnDevice } from "App/ui/components"
import { FilesManagerPanelProps } from "App/files-manager/components/files-manager-panel/files-manager-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  FilesManagerSelectionManager,
} from "App/files-manager/components/files-manager-panel/files-manager-panel.styled"
import { FilesManagerPanelTestIds } from "App/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import FilesManagerSearchInput from "App/files-manager/components/files-manager-search-input/files-manager-search-input"
import { TooltipPrimaryContent } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/tooltip-primary-content.component"
import ElementWithTooltip from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import styled from "styled-components"
import { getFreeFilesSlotsCountForHarmony } from "App/files-manager/helpers/get-free-files-slots-count-for-harmony.helper"
import { filesSlotsHarmonyLimit } from "App/files-manager/constants/files-slots-harmony-limit.constans"

const StyledTooltipPrimaryContent = styled(TooltipPrimaryContent)`
  max-width: 21rem;
  position: relative;
  right: 6rem;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.08);
`

const messages = defineMessages({
  uploadButton: { id: "module.filesManager.uploadButton" },
  deleteButton: { id: "module.filesManager.deleteButton" },
  tooManyFiles: { id: "module.filesManager.tooManyFiles" },
})

export const FilesManagerPanel: FunctionComponent<FilesManagerPanelProps> = ({
  disabled,
  onUploadFile,
  selectedFiles,
  allItemsSelected,
  onDeleteClick,
  toggleAll,
  resetRows,
  searchValue,
  onSearchValueChange,
  filesCount,
  device,
}) => {
  const selectedItemsCount = selectedFiles.length
  const selectionMode = selectedItemsCount > 0

  const freeSlots = getFreeFilesSlotsCountForHarmony(filesCount)

  const tooManyFiles = device === DeviceType.MuditaHarmony && freeSlots < 1

  const uploadButton = (
    <ButtonWrapper>
      <Button
        data-testid={FilesManagerPanelTestIds.Button}
        displayStyle={DisplayStyle.Primary}
        labelMessage={messages.uploadButton}
        onClick={onUploadFile}
        disabled={disabled || tooManyFiles}
      />
    </ButtonWrapper>
  )

  return (
    <VisibleOnDevice
      devices={[DeviceType.MuditaPure, DeviceType.MuditaHarmony]}
    >
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
              <FilesManagerSearchInput
                data-testid={FilesManagerPanelTestIds.SearchInput}
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
              />
              {tooManyFiles ? (
                <ElementWithTooltip Element={uploadButton}>
                  <StyledTooltipPrimaryContent
                    description={{
                      ...messages.tooManyFiles,
                      values: {
                        maxFilesCount: filesSlotsHarmonyLimit,
                      },
                    }}
                  />
                </ElementWithTooltip>
              ) : (
                <>{uploadButton}</>
              )}
            </>
          )}
        </Panel>
      </PanelWrapper>
    </VisibleOnDevice>
  )
}
