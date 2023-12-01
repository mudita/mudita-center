/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { State } from "App/core/constants"
import { File } from "App/files-manager/dto"
import FilesStorageList from "App/files-manager/components/files-storage-list/files-storage-list.component"
import { FilesStorageListTestIds } from "App/files-manager/components/files-storage-list/files-storage-list-test-ids.enum"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { VirtuosoMockContext } from "react-virtuoso"

type Props = ComponentProps<typeof FilesStorageList>

const defaultProps: Props = {
  state: State.Initial,
  files: [],
  noFoundFiles: false,
  toggleRow: jest.fn(),
  selectedItems: [],
  onDelete: jest.fn(),
  hideCheckbox: false,
}

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
} as unknown as ReduxRootState

const files: File[] = [
  {
    id: "user/music/example_file_name.mp3",
    size: 1234,
    name: "example_file_name.mp3",
    type: "mp3",
  },
  {
    id: "user/music/second_example_file_name.wav",
    size: 12345,
    name: "second_example_file_name.wav",
    type: "wav",
  },
]

const render = (extraProps?: Partial<Props>, state = defaultState) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <FilesStorageList {...props} />
    </Provider>,
    {
      wrapper: ({ children }) => (
        <VirtuosoMockContext.Provider
          value={{ viewportHeight: 300, itemHeight: 100 }}
        >
          {children}
        </VirtuosoMockContext.Provider>
      ),
    }
  )
}

describe("`FilesStorageList` component", () => {
  test("Empty files storage is rendered as default state", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.NoFound)
    ).not.toBeInTheDocument()
  })

  test("Error info is rendered if State is equal to Failed", () => {
    const { queryByTestId } = render({ state: State.Failed })
    expect(queryByTestId(FilesStorageListTestIds.Error)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.NoFound)
    ).not.toBeInTheDocument()
  })

  test("Loading component is rendered if state is Loading", () => {
    const { queryByTestId } = render({
      state: State.Loading,
    })
    expect(queryByTestId(FilesStorageListTestIds.Loading)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.NoFound)
    ).not.toBeInTheDocument()
  })

  test("Empty state is rendered if state is Loaded and files list is empty", () => {
    const { queryByTestId } = render({ state: State.Loaded })
    expect(queryByTestId(FilesStorageListTestIds.Empty)).toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.NoFound)
    ).not.toBeInTheDocument()
  })

  test("No results is rendered if state is Loaded and `noFoundFiles` is set to true", () => {
    const { queryByTestId } = render({
      state: State.Loaded,
      noFoundFiles: true,
    })

    expect(queryByTestId(FilesStorageListTestIds.NoFound)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
  })

  test("Files storage list is rendered if state is Loaded and files list isn't empty", () => {
    const { queryByTestId, queryAllByTestId } = render({
      state: State.Loaded,
      files,
    })

    expect(queryAllByTestId(FilesStorageListTestIds.Row)[0]).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Loaded)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.NoFound)
    ).not.toBeInTheDocument()
  })
})
