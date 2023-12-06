/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device/constants"
import React, { ComponentProps } from "react"
import { State } from "Core/core/constants"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import FilesStorage from "Core/files-manager/components/files-storage/files-storage.component"
import { FilesStorageTestIds } from "Core/files-manager/components/files-storage/files-storage-test-ids.enum"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

type Props = ComponentProps<typeof FilesStorage>

const defaultProps: Props = {
  noFoundFiles: false,
  searchValue: "",
  allItemsSelected: false,
  state: State.Initial,
  files: [],
  selectedItems: [],
  disableUpload: false,
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  toggleItem: jest.fn(),
  onDeleteClick: jest.fn(),
  onManagerDeleteClick: jest.fn(),
  uploadFiles: jest.fn(),
  onSearchValueChange: jest.fn(),
  deviceType: DeviceType.MuditaPure,
}

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
  filesManager: {
    files: [{}],
  },
} as unknown as ReduxRootState

const render = (extraProps?: Partial<Props>, state = defaultState) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <FilesStorage {...props} />
    </Provider>
  )
}

describe("`Files Storage` component", () => {
  test("should render properly", () => {
    const { queryByTestId } = render(undefined, {
      device: {
        deviceType: DeviceType.MuditaPure,
      },
      filesManager: {
        files: [{}],
      },
    } as ReduxRootState)
    expect(queryByTestId(FilesStorageTestIds.Title)).toHaveTextContent(
      "[value] component.filesManagerFilesStorageTitle"
    )
    expect(queryByTestId(FilesStorageTestIds.List)).toBeInTheDocument()
  })
})
