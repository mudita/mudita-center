/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import React, { ComponentProps } from "react"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

const defaultProps: ComponentProps<typeof FilesManager> = {
  memorySpace: {
    free: 62914560,
    full: 104857600,
    total: 16000000000,
  },
  files: [],
  resultState: ResultState.Empty,
  getFiles: noop,
  deviceType: DeviceType.MuditaPure,
  resetAllItems: noop,
  selectAllItems: noop,
  toggleItem: noop,
  selectedItems: [],
  allItemsSelected: false,
  onDeleteFiles: noop,
}

const render = (state?: ReduxRootState) => {
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <FilesManager {...defaultProps} />
    </Provider>
  )
}

describe("Files Manager component", () => {
  test("should render properly for Pure", () => {
    const { queryByTestId } = render({
      device: {
        deviceType: DeviceType.MuditaPure,
      },
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
  test("should render properly for Harmony", () => {
    const { queryByTestId } = render({
      device: {
        deviceType: DeviceType.MuditaHarmony,
      },
    } as ReduxRootState)
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
})
