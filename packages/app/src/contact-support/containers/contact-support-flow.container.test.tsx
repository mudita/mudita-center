/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Renderer/store"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ModalsManager from "App/modals-manager/containers/modals-manager.container"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"
import { ContactSupportFlowTestIds } from "App/contact-support/components/contact-support-flow-test-ids.component"

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
