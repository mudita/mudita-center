/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { waitFor } from "@testing-library/dom"
import { DeviceType } from "App/device/constants"
import { screen, fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import {
  CrashDumpModal,
  CrashDumpProps,
} from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.component"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const propsMock: CrashDumpProps = {
  open: false,
  deviceType: DeviceType.MuditaPure,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}

const render = (extraProps?: CrashDumpProps) => {
  return renderWithThemeAndIntl(
    <CrashDumpModal {...propsMock} {...extraProps} />
  )
}

test("Modal isn't rendering if `open` flag is equal to `false`", () => {
  render()

  expect(
    screen.queryByTestId(CrashDumpModalTestingIds.Content)
  ).not.toBeInTheDocument()
})

describe("When `deviceType` is equal to `MuditaPure`", () => {
  test("Modal rendering with a content and label `pureLabel` if `open` flag is equal to `true`", () => {
    render({
      ...propsMock,
      deviceType: DeviceType.MuditaPure,
      open: true,
    })

    expect(
      screen.getByTestId(CrashDumpModalTestingIds.Content)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(CrashDumpModalTestingIds.Label)
    ).toHaveTextContent("[value] component.crashDumpModal.pureLabel")
    expect(screen.getByTestId(CrashDumpModalTestingIds.Text)).toHaveTextContent(
      "[value] component.crashDumpModal.text"
    )
  })
})

describe("When `deviceType` is equal to `MuditaHarmony`", () => {
  test("Modal rendering with a content and label `harmonyLabel` if `open` flag is equal to `true`", () => {
    render({
      ...propsMock,
      deviceType: DeviceType.MuditaHarmony,
      open: true,
    })

    expect(
      screen.getByTestId(CrashDumpModalTestingIds.Content)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(CrashDumpModalTestingIds.Label)
    ).toHaveTextContent("[value] component.crashDumpModal.harmonyLabel")
    expect(screen.getByTestId(CrashDumpModalTestingIds.Text)).toHaveTextContent(
      "[value] component.crashDumpModal.text"
    )
  })
})

test("Modal close button react on click actions", () => {
  render({
    ...propsMock,
    open: true,
  })

  const crossButton = screen.getByTestId(ModalTestIds.CloseButton)

  expect(propsMock.onClose).toHaveBeenCalledTimes(0)

  fireEvent.click(crossButton)

  expect(propsMock.onClose).toHaveBeenCalledTimes(1)
})

test("Modal submit button react on click actions", async () => {
  render({
    ...propsMock,
    open: true,
  })
  const submitButton = screen.getByTestId(CrashDumpModalTestingIds.Submit)
  expect(propsMock.onSubmit).toHaveBeenCalledTimes(0)

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(propsMock.onSubmit).toHaveBeenCalledTimes(1)
  })
})
