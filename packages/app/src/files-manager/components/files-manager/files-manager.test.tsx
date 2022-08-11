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

const defaultProps: ComponentProps<typeof FilesManager> = {
  memorySpace: {
    reservedSpace: 62914560,
    usedUserSpace: 104857600,
    total: 16000000000,
  },
  files: [],
  resultState: ResultState.Empty,
  getFiles: noop,
  deviceType: DeviceType.MuditaPure,
}

const render = () => {
  return renderWithThemeAndIntl(<FilesManager {...defaultProps} />)
}

describe("Files Manager component", () => {
  test("should render properly", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
})
