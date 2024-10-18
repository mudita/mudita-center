/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalStateKey, showModal } from "Core/modals-manager"
import { defineMessages } from "react-intl"
import { IconType } from "generic-view/utils"
import { ButtonText, H5 } from "generic-view/ui"
import { HelpTestId } from "../test-ids"

const messages = defineMessages({
  title: {
    id: "module.help.footer.title",
  },
  description: {
    id: "module.help.footer.description",
  },
  buttonLabel: {
    id: "module.help.footer.buttonLabel",
  },
})

export const HelpFooter: FunctionComponent = () => {
  const dispatch = useDispatch()
  const openContactSupportFlow = () => {
    return dispatch(showModal(ModalStateKey.ContactSupportFlow))
  }
  return (
    <Wrapper data-testid={HelpTestId.MainFooter}>
      <H5 data-testid={HelpTestId.MainFooterTitle}>
        {intl.formatMessage(messages.title)}
      </H5>
      <Text data-testid={HelpTestId.MainFooterDescription}>
        {intl.formatMessage(messages.description)}
      </Text>
      <ButtonText
        style={{
          padding: "0.5rem 0.8rem",
        }}
        config={{
          text: intl.formatMessage(messages.buttonLabel),
          actions: [
            {
              type: "custom",
              callback: openContactSupportFlow,
            },
          ],
          icon: IconType.Support,
          modifiers: ["link", "uppercase"],
        }}
        data-testid={HelpTestId.MainFooterContactSupportButton}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
  padding: 3.1rem 3.2rem 3.2rem;
  border-top: 0.1rem solid ${({ theme }) => theme.color.grey4};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.labelText};
  line-height: ${({ theme }) => theme.lineHeight.labelText};
  color: ${({ theme }) => theme.color.grey1};
  white-space: pre;
  text-align: right;
  margin: 0;
  flex: 1;
`
