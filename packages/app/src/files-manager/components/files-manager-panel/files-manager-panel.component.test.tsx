/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "@mudita/pure"
import { fireEvent } from "@testing-library/dom"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesManagerPanel } from "App/files-manager/components/files-manager-panel/files-manager-panel.component"
import { FilesManagerPanelProps } from "App/files-manager/components/files-manager-panel/files-manager-panel.interface"
import { FilesManagerPanelTestIds } from "App/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"

const defaultProps: FilesManagerPanelProps = {
  onUploadFile: jest.fn(),
  toggleAll: jest.fn(),
  resetRows: jest.fn(),
  onDeleteClick: jest.fn(),
  disabled: false,
  selectedFiles: [],
  allItemsSelected: false,
}

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
} as ReduxRootState

const render = (props = defaultProps, state = defaultState) => {
  const store = createMockStore([thunk])(state)

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <FilesManagerPanel {...props} />
    </Provider>
  )
}

describe("When Mudita Harmony connected", () => {
  test("don't render component component", () => {
    const { queryByTestId } = render(defaultProps, {
      device: {
        deviceType: DeviceType.MuditaHarmony,
      },
    } as ReduxRootState)

    expect(
      queryByTestId(FilesManagerPanelTestIds.Wrapper)
    ).not.toBeInTheDocument()
  })
})

describe("When Mudita Pure connected", () => {
  test("renders component component", () => {
    const { queryByTestId } = render(defaultProps, {
      device: {
        deviceType: DeviceType.MuditaPure,
      },
    } as ReduxRootState)

    expect(queryByTestId(FilesManagerPanelTestIds.Wrapper)).toBeInTheDocument()
  })

  test("calls `onUploadFile` when user click on `upload` button", () => {
    const { getByTestId } = render()

    const button = getByTestId(FilesManagerPanelTestIds.Button)

    expect(defaultProps.onUploadFile).toBeCalledTimes(0)

    fireEvent.click(button)

    expect(defaultProps.onUploadFile).toBeCalledTimes(1)
  })

  describe("Selection functionality", () => {
    test("displays selection manager if selection list has been provided", () => {
      const { getByTestId } = render({
        ...defaultProps,
        selectedFiles: ["1"],
      })

      expect(
        getByTestId(FilesManagerPanelTestIds.SelectionManager)
      ).toBeInTheDocument()
    })

    test("calls `onDeleteClick` when user click on `delete` button", () => {
      const { getByText } = render({
        ...defaultProps,
        selectedFiles: ["1"],
      })

      const button = getByText("[value] module.filesManager.deleteButton")

      expect(defaultProps.onDeleteClick).toBeCalledTimes(0)

      fireEvent.click(button)

      expect(defaultProps.onDeleteClick).toBeCalledTimes(1)
    })
  })
})
