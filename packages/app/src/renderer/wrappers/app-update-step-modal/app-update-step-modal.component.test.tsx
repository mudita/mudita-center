/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import { fireEvent } from "@testing-library/dom"
import { screen } from "@testing-library/react"
import AppUpdateStepModal from "Renderer/wrappers/app-update-step-modal/app-update-step-modal.component"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { AppUpdateEvent, AppUpdateAction } from "App/main/autoupdate"
import { AppUpdateStepModalTestIds } from "Renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"

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
        callback: (data: any) => PromiseLike<any>
      ) => {
        switch (channel) {
          case AppUpdateEvent.Downloaded:
            callback(jest.fn)
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
    openExternal: jest.fn((...args) => openExternalMock(...args)),
  },
}))

const renderer = () => {
  return renderWithThemeAndIntl(
    <AppUpdateStepModal appLatestVersion={"0.0.1"} closeModal={onCloseMock} />
  )
}

describe("Testing modal behavior", () => {
  test("opens Update progress modal", () => {
    renderer()

    fireEvent.click(screen.getByTestId(ModalTestIds.ModalActionButton))

    expect(
      screen.getByTestId(AppUpdateStepModalTestIds.AppUpdateProgressModal)
    ).toBeInTheDocument()
  })
})
