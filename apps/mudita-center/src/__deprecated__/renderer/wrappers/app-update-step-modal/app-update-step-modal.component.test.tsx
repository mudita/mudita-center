/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { fireEvent } from "@testing-library/dom"
import { screen, waitFor } from "@testing-library/react"
import AppUpdateStepModal from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import {
  AppUpdateEvent,
  AppUpdateAction,
} from "App/__deprecated__/main/autoupdate"
import { AppUpdateStepModalTestIds } from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"
import { Provider } from "react-redux"
import store from "../../store"

const onCloseMock = jest.fn()
const openExternalMock = jest.fn()

jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      callMain: (channel: AppUpdateAction) => {
        switch (channel) {
          case AppUpdateAction.Install:
            return jest.fn()
          default:
            return false
        }
      },
      answerMain: (
        channel: AppUpdateEvent,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (data: any) => PromiseLike<any>
      ) => {
        switch (channel) {
          case AppUpdateEvent.Downloaded:
            void callback(jest.fn)
            return () => jest.fn()
          default:
            return () => jest.fn()
        }
      },
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

jest.mock("electron", () => ({
  shell: {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    openExternal: jest.fn((...args) => openExternalMock(...args)),
  },
}))

const renderer = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <AppUpdateStepModal appLatestVersion={"0.0.1"} closeModal={onCloseMock} />
    </Provider>
  )
}

describe("Testing modal behavior", () => {
  test("opens Update progress modal", async () => {
    renderer()

    fireEvent.click(screen.getByTestId("privacy-policy-checkbox"))
    await waitFor(() => {
      expect(screen.getByTestId("privacy-policy-checkbox")).toBeChecked()
      expect(screen.getByTestId(ModalTestIds.ModalActionButton)).toBeEnabled()
    })
    fireEvent.click(screen.getByTestId(ModalTestIds.ModalActionButton))

    expect(
      screen.getByTestId(AppUpdateStepModalTestIds.AppUpdateProgressModal)
    ).toBeInTheDocument()
  })
})
