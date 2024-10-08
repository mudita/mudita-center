/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Core/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ModalsManager from "Core/modals-manager/components/modals-manager.component"
import ContactSupportFlow from "Core/contact-support/containers/contact-support-flow.container"
import { ContactSupportFlowTestIds } from "Core/contact-support/components/contact-support-flow-test-ids.component"

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("e2e-test-ids", () => {
  return {
    ModalTestIds: {
      Modal: "modal-content",
    },
    NewContactSupportModalTestIds: {
      Title: "contact-support-modal-title",
      Subtitle: "contact-support-modal-subtitle",
      EmailLabel: "email-label",
      MessageLabel: "message-label",
      AttachedFilesLabel: "attached-files-label",
      AttachedFilesSubtext: "attached-files-subtext",
    },
  }
})

type Props = ComponentProps<typeof ModalsManager>

const defaultProps: Props = {}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <ContactSupportFlow {...props} />
    </Provider>
  )
}

describe("`ContactSupportFlow` container", () => {
  describe("when component is render with init store", () => {
    test("`ContactSupportModal` is render", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalSuccess)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalError)
      ).not.toBeInTheDocument()
    })
  })
})
