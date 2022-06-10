/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { screen } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CrashDumpSendingModal, CrashDumpSendingModalProps } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-modal.component"
import { CrashDumpSendingModalTestingIds } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-testing-ids.enum"

const propsMock: CrashDumpSendingModalProps = {
  open: false,
}

const render = (extraProps?: CrashDumpSendingModalProps) => {
  return renderWithThemeAndIntl(<CrashDumpSendingModal {...propsMock} {...extraProps} />)
}

test("Modal isn't rendering if `open` flag is equal to `false`", () => {
  render()

  expect(screen.queryByTestId(CrashDumpSendingModalTestingIds.Content)).not.toBeInTheDocument()
})

test("Modal rendering with a content if `open` flag is equal to `true`", () => {
  render({
    ...propsMock,
    open: true,
  })

  expect(screen.getByTestId(CrashDumpSendingModalTestingIds.Content)).toBeInTheDocument()
  expect(screen.getByTestId(CrashDumpSendingModalTestingIds.Label)).toHaveTextContent("[value] component.crashDumpSendingModal.label")
})

