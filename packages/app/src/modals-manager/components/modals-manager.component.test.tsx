/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ModalsManager from "App/modals-manager/components/modals-manager.component"
import { AppForcedUpdateFlowTestIds } from "App/settings/components/app-forced-update-flow/app-forced-update-flow-test-ids.enum"
import { AppUpdateFlowTestIds } from "App/settings/components/app-update-flow/app-update-flow-test-ids.enum"
import { ContactSupportFlowTestIds } from "App/contact-support/components/contact-support-flow-test-ids.component"
import { ErrorConnectingModalTestIds } from "App/connecting/components/error-connecting-modal-test-ids.enum"

jest.mock(
  "App/modals-manager/selectors/device-initialization-failed-modal-show-enabled.selector"
)
jest.mock("electron-better-ipc", () => ({
  ipcRenderer: {
    answerMain: jest.fn(),
  },
}))

jest.mock(
  "electron",
  jest.fn().mockImplementation(() => ({
    remote: {
      dialog: {
        showOpenDialog: jest.fn(),
      },
    },
  }))
)

type Props = ComponentProps<typeof ModalsManager>

const defaultProps: Props = {
  appForcedUpdateFlowShow: false,
  appUpdateFlowShow: false,
  contactSupportFlowShow: false,
  deviceInitializationFailedModalShowEnabled: false,
  hideModals: jest.fn(),
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
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
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
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
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
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
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
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component is render with proper where `deviceInitializationFailedModalShowEnabled` is set to `true`", () => {
    test("`ErrorConnectingModal` is visible", () => {
      const { queryByTestId } = render({
        deviceInitializationFailedModalShowEnabled: true,
      })

      expect(
        queryByTestId(ErrorConnectingModalTestIds.Container)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(AppForcedUpdateFlowTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })
})
