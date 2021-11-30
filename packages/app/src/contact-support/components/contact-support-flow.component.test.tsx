/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ContactSupportFlow from "App/contact-support/components/contact-support-flow.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { ContactSupportFlowTestIds } from "App/contact-support/components/contact-support-flow-test-ids.component"
import { SendTicketState } from "App/contact-support/reducers"

type Props = ComponentProps<typeof ContactSupportFlow>

const defaultProps: Props = {
  closeContactSupportFlow: jest.fn(),
  sendTicket: jest.fn(),
  state: null,
  files: []
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ContactSupportFlow {...props} />)
}

describe("`ContactSupportFlow` component", () => {
  describe("when component is render with default props", () => {
    test("`ContactSupportModal` as default is render", () => {
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

  describe("when component is render with proper where `state` is set to `Sending`", () => {
    test("`ContactSupportModal` is render", () => {
      const { queryByTestId } = render({ state: SendTicketState.Sending })

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

  describe("when component is render with proper where `state` is set to `Success`", () => {
    test("`ContactSupportModal` is render", () => {
      const { queryByTestId } = render({ state: SendTicketState.Success })

      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalSuccess)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component is render with proper where `state` is set to `Error`", () => {
    test("`ContactSupportModal` is render", () => {
      const { queryByTestId } = render({ state: SendTicketState.Error })

      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ContactSupportFlowTestIds.ContactSupportModalSuccess)
      ).not.toBeInTheDocument()
    })
  })
})
