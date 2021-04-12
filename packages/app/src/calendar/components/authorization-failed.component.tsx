/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { ModalContent } from "App/calendar/components/calendar-modals.styled"
import {
  ExternalProvider,
  Provider,
} from "Renderer/models/external-providers/external-providers.interface"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.authorizationFailed.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.authorizationFailed.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.authorizationFailed.body",
  },
  button: {
    id: "view.name.calendar.modal.authorizationFailed.button",
  },
  google: {
    id: "component.modal.providers.google",
  },
  apple: {
    id: "component.modal.providers.apple",
  },
  microsoft: {
    id: "component.modal.providers.microsoft",
  },
})

interface AuthorizationFailedModalProps extends ModalProps {
  provider: ExternalProvider
}

const AuthorizationFailedModal: FunctionComponent<AuthorizationFailedModalProps> = ({
  provider,
  ...props
}) => {
  const providerName = (() => {
    switch (provider) {
      case Provider.Google:
        return intl.formatMessage(messages.google)
      case Provider.Apple:
        return intl.formatMessage(messages.apple)
      case Provider.Outlook:
        return intl.formatMessage(messages.microsoft)
    }
  })()

  return (
    <Modal
      {...props}
      size={ModalSize.Small}
      title={
        <FormattedMessage
          {...messages.title}
          values={{ provider: providerName }}
        />
      }
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.button)}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={Type.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
          message={messages.body}
        />
      </ModalContent>
    </Modal>
  )
}

export default AuthorizationFailedModal
