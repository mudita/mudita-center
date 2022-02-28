/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Renderer/store"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import { CollectingDataModalTestIds } from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { AppForcedUpdateFlowTestIds } from "Renderer/modules/settings/components/app-forced-update-flow-test-ids.enum"
import { AppUpdateFlowTestIds } from "Renderer/modules/settings/components/app-update-flow-test-ids.enum"

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
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })
})
