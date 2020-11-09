import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

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
    id: "common.providers.google",
  },
  apple: {
    id: "common.providers.apple",
  },
  microsoft: {
    id: "common.providers.microsoft",
  },
})

interface AuthorizationFailedModalProps extends ModalProps {
  provider: Provider
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
      case Provider.Microsoft:
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
