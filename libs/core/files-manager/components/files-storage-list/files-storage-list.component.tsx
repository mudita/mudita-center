/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { FilesStorageListTestIds } from "Core/files-manager/components/files-storage-list/files-storage-list-test-ids.enum"
import {
  EmptyState,
  LoadingState,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { defineMessages } from "react-intl"
import { State } from "Core/core/constants"
import { File } from "Core/files-manager/dto"
import { FilesStorageContainer } from "Core/files-manager/components/files-storage-list/files-storage-list.styled"
import FilesStorageListTable from "Core/files-manager/components/files-storage-list-table/files-storage-list-table.component"

const messages = defineMessages({
  emptyStateTitle: {
    id: "component.filesManagerFilesStorageEmptyStateTitle",
  },
  emptyStateDescription: {
    id: "component.filesManagerFilesStorageEmptyStateDescription",
  },
  noFoundStateTitle: {
    id: "component.filesManagerFilesStorageNoFoundStateTitle",
  },
  noFoundStateDescription: {
    id: "component.filesManagerFilesStorageNoFoundStateDescription",
  },
  errorTitle: {
    id: "component.filesManagerFilesStorageErrorStateTitle",
  },
  errorDescription: {
    id: "component.filesManagerFilesStorageErrorStateDescription",
  },
})

interface Props {
  state: State
  files: File[]
  noFoundFiles: boolean
  onDelete: (ids: string[]) => void
  hideCheckbox: boolean
}

const FilesStorageList: FunctionComponent<Props> = ({
  state,
  files = [],
  onDelete,
  noFoundFiles,
  hideCheckbox,
  ...rest
}) => {
  const loadedOrInitialState = state === State.Initial || state === State.Loaded
  const noFoundFilesState = loadedOrInitialState && noFoundFiles
  const noFilesState =
    loadedOrInitialState && files.length === 0 && !noFoundFiles

  return (
    <FilesStorageContainer {...rest}>
      {state === State.Loaded && files.length > 0 && (
        <FilesStorageListTable
          files={files}
          onDelete={onDelete}
          hideCheckbox={hideCheckbox}
        />
      )}
      {state === State.Loading && (
        <LoadingState data-testid={FilesStorageListTestIds.Loading} />
      )}
      {state === State.Failed && (
        <EmptyState
          title={messages.errorTitle}
          description={messages.errorDescription}
          data-testid={FilesStorageListTestIds.Error}
        />
      )}
      {noFilesState && (
        <EmptyState
          data-testid={FilesStorageListTestIds.Empty}
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
        />
      )}
      {noFoundFilesState && (
        <EmptyState
          data-testid={FilesStorageListTestIds.NoFound}
          title={messages.noFoundStateTitle}
          description={messages.noFoundStateDescription}
        />
      )}
    </FilesStorageContainer>
  )
}

export default FilesStorageList
