/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ModalsManager from "App/modals-manager/components/modals-manager.component"
import { CollectingDataModalTestIds } from "App/__deprecated__/renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { AppForcedUpdateFlowTestIds } from "App/__deprecated__/renderer/modules/settings/components/app-forced-update-flow/app-forced-update-flow-test-ids.enum"
import { AppUpdateFlowTestIds } from "App/__deprecated__/renderer/modules/settings/components/app-update-flow/app-update-flow-test-ids.enum"
import { ContactSupportFlowTestIds } from "App/contact-support/components/contact-support-flow-test-ids.component"

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
  contactSupportFlowShow: false,
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
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
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
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
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
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
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
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component is render with proper where `contactSupportFlowShow` is set to `true`", () => {
    test("`ContactSupportModal` is visible", () => {
      const { queryByTestId } = render({ contactSupportFlowShow: true })

      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })
})
