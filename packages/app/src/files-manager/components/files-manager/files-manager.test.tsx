/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { State } from "App/core/constants"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"

const defaultProps: ComponentProps<typeof FilesManager> = {
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
  uploadFile: jest.fn(),
  deviceType: DeviceType.MuditaPure,
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  toggleItem: jest.fn(),
  selectedItems: [],
  allItemsSelected: false,
  deleteFiles: jest.fn(),
  resetDeletingState: jest.fn(),
}

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
} as unknown as ReduxRootState

const render = (props = defaultProps, state = defaultState) => {
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
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
  test("should render properly for Harmony", () => {
    const { queryByTestId } = render(defaultProps, {
      device: {
        deviceType: DeviceType.MuditaHarmony,
      },
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
})

describe("Uploading modal", () => {
  test("renders LoaderModal if `uploading` is equal to `State.Loading`", () => {
    const { queryByTestId } = render({
      ...defaultProps,
      uploading: State.Loading,
    })

    expect(
      queryByTestId(FilesManagerTestIds.UploadingModal)
    ).toBeInTheDocument()
  })
})
