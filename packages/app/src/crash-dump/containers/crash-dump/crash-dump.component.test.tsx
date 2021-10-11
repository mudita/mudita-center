/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { screen, fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { CrashDump } from "App/crash-dump/containers/crash-dump/crash-dump.component"
import { ReduxRootState } from "App/renderer/store"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { CrashDumpSendingModalTestingIds } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-testing-ids.enum"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

const initialStateMock = {
  crashDump: {
    data: {
      files: [],
      downloadedFiles: [],
    },
    status: {
      loading: false,
      loaded: false,
      downloading: false,
      downloaded: false,
    },
    error: null,
  },
} as unknown as ReduxRootState

const downloadCrashDumpMock = jest.fn()

jest.mock("App/crash-dump/actions", () => ({
  downloadCrashDump: () => downloadCrashDumpMock,
}))

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
    screen.queryByTestId(CrashDumpSendingModalTestingIds.Content)
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
  expect(
    screen.queryByTestId(CrashDumpSendingModalTestingIds.Content)
  ).not.toBeInTheDocument()
})

test("display `CrashDumpSendingModal` modal if data.files list isn't empty and `downloading` flag is equal to `true`", () => {
  render({
    ...initialStateMock,
    crashDump: {
      ...initialStateMock.crashDump,
      data: {
        ...initialStateMock.crashDump.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
      status: {
        ...initialStateMock.crashDump.status,
        downloading: true,
      },
    },
  })

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(CrashDumpSendingModalTestingIds.Content)
  ).toBeInTheDocument()
})

test("close `CrashDumpModal` modal if user clicked on `close` button", () => {
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

  const closeButton = screen.getByTestId(ModalTestIds.CloseBottomButton)

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).toBeInTheDocument()

  fireEvent.click(closeButton)

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
})

test("calls `downloadCrashDump` action if user click on `send` button", () => {
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

  const actionButton = screen.getByTestId(ModalTestIds.ModalActionButton)

  expect(downloadCrashDumpMock).not.toHaveBeenCalled()

  fireEvent.click(actionButton)

  expect(downloadCrashDumpMock).toHaveBeenCalled()
})
