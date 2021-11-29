/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Renderer/store"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ModalsManager from "App/modals-manager/components/modals-manager.component"
import { CollectingDataModalTestIds } from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { AppForcedUpdateFlowTestIds } from "Renderer/modules/settings/components/app-forced-update-flow-test-ids.enum"
import { AppUpdateFlowTestIds } from "Renderer/modules/settings/components/app-update-flow-test-ids.enum"

jest.mock("electron-better-ipc", () => ({
  ipcRenderer: {
    answerMain: jest.fn(),
  },
}))

type Props = ComponentProps<typeof ModalsManager>

const defaultProps: Props = {
  collectingDataModalShow: false,
  appForcedUpdateFlowShow: false,
  appUpdateFlowShow: false,
}

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

describe("`ModalsManager` component", () => {
  describe("when component is render with default props", () => {
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

  describe("when component is render with proper where `collectingDataModalShow` is set to `true`", () => {
    test("`CollectingDataModal` is visible", () => {
      const { queryByTestId } = render({ collectingDataModalShow: true })

      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).toBeInTheDocument()
      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component is render with proper where `appForcedUpdateFlowShow` is set to `true`", () => {
    test("`AppForcedUpdateFlow` is visible", () => {
      const { queryByTestId } = render({ appForcedUpdateFlowShow: true })

      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).toBeInTheDocument()
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component is render with proper where `appUpdateFlowShow` is set to `true`", () => {
    test("`AppUpdateFlow` is visible", () => {
      const { queryByTestId } = render({ appUpdateFlowShow: true })

      expect(queryByTestId(AppUpdateFlowTestIds.Container)).toBeInTheDocument()
      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })
})
