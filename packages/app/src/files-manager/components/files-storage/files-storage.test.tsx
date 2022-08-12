/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceType } from "@mudita/pure"

type Props = ComponentProps<typeof FilesStorage>

const defaultProps: Props = {
  resultState: ResultState.Empty,
  files: [],
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  toggleItem: jest.fn(),
  selectedItems: [],
  allItemsSelected: false,
  onDeleteClick: jest.fn(),
  onDeleteSelected: jest.fn(),
}

const render = (extraProps?: Partial<Props>, state?: ReduxRootState) => {
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
    } as ReduxRootState)
    expect(queryByTestId(FilesStorageTestIds.Title)).toHaveTextContent(
      "[value] component.filesManagerFilesStorageTitle"
    )
    expect(queryByTestId(FilesStorageTestIds.List)).toBeInTheDocument()
  })
})
