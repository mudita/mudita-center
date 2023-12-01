/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { State } from "App/core/constants"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import { UploadFilesModalsTestIds } from "App/files-manager/components/upload-files-modals/upload-files-modals-test-ids.enum"
import { DeleteFilesModalsTestIds } from "App/files-manager/components/delete-files-modals/delete-files-modals-test-ids.enum"
import { initialState as filesManagerInitialState } from "App/files-manager/reducers/files-manager.reducer"

type Props = ComponentProps<typeof FilesManager>
const defaultProps: Props = {
  error: null,
  uploadingFileCount: 0,
  deletingFileCount: 0,
  memorySpace: {
    reservedSpace: 62914560,
    usedUserSpace: 104857600,
    total: 16000000000,
  },
  files: [],
  loading: State.Initial,
  uploading: State.Initial,
  deleting: State.Initial,
  getFiles: jest.fn(),
  deviceType: DeviceType.MuditaPure,
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  toggleItem: jest.fn(),
  selectedItems: [],
  allItemsSelected: false,
  deleteFiles: jest.fn(),
  resetDeletingState: jest.fn(),
  resetUploadingState: jest.fn(),
  resetUploadingStateAfterSuccess: jest.fn(),
  uploadBlocked: false,
  setDeletingFileCount: jest.fn(),
  abortPendingUpload: jest.fn(),
  continuePendingUpload: jest.fn(),
  pendingFilesCount: 0,
}

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
  filesManager: { ...filesManagerInitialState },
} as unknown as ReduxRootState

const render = (extraProps?: Partial<Props>, state = defaultState) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <FilesManager {...props} />
    </Provider>
  )
}

describe("Files Manager component", () => {
  test("should render properly for Pure", () => {
    const { queryByTestId } = render(defaultProps, {
      device: {
        deviceType: DeviceType.MuditaPure,
      },
      filesManager: { ...filesManagerInitialState },
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
  test("should render properly for Harmony", () => {
    const { queryByTestId } = render(defaultProps, {
      device: {
        deviceType: DeviceType.MuditaHarmony,
      },
      filesManager: { ...filesManagerInitialState },
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
})

describe("Uploading modal", () => {
  test("renders LoaderModal if `uploading` is equal to `State.Loading`", () => {
    const { queryByTestId } = render({
      uploading: State.Loading,
    })

    expect(
      queryByTestId(UploadFilesModalsTestIds.LoadingModal)
    ).toBeInTheDocument()
  })
})

describe("Deleting modal", () => {
  test("renders LoaderModal if `uploading` is equal to `State.Loading`", () => {
    const { queryByTestId } = render({
      deleting: State.Loading,
    })

    expect(
      queryByTestId(DeleteFilesModalsTestIds.LoadingModal)
    ).toBeInTheDocument()
  })
})
