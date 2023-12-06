/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Core/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ModalsManager from "Core/modals-manager/components/modals-manager.container"
import { AppForcedUpdateFlowTestIds } from "Core/settings/components/app-forced-update-flow/app-forced-update-flow-test-ids.enum"
import { AppUpdateFlowTestIds } from "Core/settings/components/app-update-flow/app-update-flow-test-ids.enum"

jest.mock("@electron/remote", () => ({
  dialog: {
    showOpenDialog: jest.fn(),
  },
}))

type Props = ComponentProps<typeof ModalsManager>

const defaultProps: Props = {}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <ModalsManager {...props} />
    </Provider>
  )
}

describe("`ModalsManager` container", () => {
  describe("when component is render with init store", () => {
    test("no modal is visible", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })
})
