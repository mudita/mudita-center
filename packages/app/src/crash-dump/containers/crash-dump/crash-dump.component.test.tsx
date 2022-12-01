/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { waitFor } from "@testing-library/dom"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { screen, fireEvent } from "@testing-library/dom"
import { DeviceType } from "App/device/constants"
import { State } from "App/core/constants"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CrashDump } from "App/crash-dump/containers/crash-dump/crash-dump.component"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { CrashDumpTestingIds } from "App/crash-dump/containers/crash-dump/crash-dump-testing-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const initialStateMock = {
  crashDump: {
    data: {
      files: [],
      downloadedFiles: [],
    },
    loadingState: State.Initial,
    downloadingState: State.Initial,
    sendingState: State.Initial,
    error: null,
  },
  device: {
    deviceType: DeviceType.MuditaPure,
  },
} as unknown as ReduxRootState

const downloadCrashDumpMock = jest.fn()
const ignoreCrashDumpMock = jest.fn()
const resetCrashDump = jest.fn()

jest.mock("App/crash-dump/actions", () => ({
  downloadCrashDump: () => downloadCrashDumpMock,
  ignoreCrashDump: () => ignoreCrashDumpMock,
  resetCrashDump: () => resetCrashDump,
}))

beforeEach(() => {
  jest.resetAllMocks()
})

const render = (initialState?: ReduxRootState) => {
  const storeMock = createMockStore([thunk])({
    ...initialStateMock,
    ...initialState,
  })

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <CrashDump />
    </Provider>
  )
}

test("don't rendering the modals if `crushDump` state is equal to initial", () => {
  render()

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("don't rendering the modals if `deviceType` equal to `null`", () => {
  render({
    ...initialStateMock,
    device: {
      ...initialStateMock.device,
      deviceType: null,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("display `CrashDumpModal` modal if data.files list isn't empty", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).toBeInTheDocument()
})

test("display `LoadingModal` modal if data.files list isn't empty and `downloadingState` flag is equal to `State.Loading`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      downloadingState: State.Loading,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Loading)).toBeInTheDocument()
})

test("display `Loading` modal if data.files list isn't empty and `sendingState` flag is equal to `State.Loading`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      sendingState: State.Loading,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Loading)).toBeInTheDocument()
})

test("display `Loading` modal if data.files list isn't empty and `loadingState` flag is equal to `State.Loading`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      loadingState: State.Loading,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Loading)).toBeInTheDocument()
})

test("display `Error` modal if data.files list isn't empty and `loadingState` flag is equal to `State.Failed`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      loadingState: State.Failed,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Failed)).toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("display `Error` modal if data.files list isn't empty and `downloadingState` flag is equal to `State.Failed`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      downloadingState: State.Failed,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Failed)).toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("display `Error` modal if data.files list isn't empty and `sendingState` flag is equal to `State.Failed`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      sendingState: State.Failed,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Failed)).toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Success)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("display `Success` modal if data.files list isn't empty and `downloadingState` and `sendingState` flag is equal to `State.Loaded`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      downloadingState: State.Loaded,
      sendingState: State.Loaded,
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Failed)
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId(CrashDumpTestingIds.Success)).toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpTestingIds.Loading)
  ).not.toBeInTheDocument()
})

test("calls `resetCrashDump` action if user click on `close` button on `Failed` modal", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      sendingState: State.Failed,
    },
  })

  const closeButton = screen.getByTestId(ModalTestIds.CloseButton)

  expect(resetCrashDump).toBeCalledTimes(0)

  fireEvent.click(closeButton)

  expect(resetCrashDump).toBeCalledTimes(1)
})

test("calls `resetCrashDump` action if user click on `close` button on `Success` modal", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      downloadingState: State.Loaded,
      sendingState: State.Loaded,
    },
  })

  const closeButton = screen.getByTestId(ModalTestIds.CloseButton)

  expect(resetCrashDump).toBeCalledTimes(0)

  fireEvent.click(closeButton)

  expect(resetCrashDump).toBeCalledTimes(1)
})

test("close `CrashDumpModal` modal if user clicked on `close` button and calls `ignoreCrashDumpMock` action", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
    },
  })

  const closeButton = screen.getByTestId(ModalTestIds.CloseButton)

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).toBeInTheDocument()

  expect(ignoreCrashDumpMock).toBeCalledTimes(0)

  fireEvent.click(closeButton)

  expect(ignoreCrashDumpMock).toBeCalledTimes(1)

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
})

test("calls `downloadCrashDump` action if user click on `send` button", async () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
    },
  })

  const actionButton = screen.getByTestId(CrashDumpModalTestingIds.Submit)

  expect(downloadCrashDumpMock).not.toHaveBeenCalled()

  fireEvent.click(actionButton)
  await waitFor(() => {
    expect(downloadCrashDumpMock).toHaveBeenCalled()
  })
})
