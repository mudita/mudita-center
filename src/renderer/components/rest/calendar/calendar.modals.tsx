import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl, textFormatters } from "Renderer/utils/intl"
import {
  ButtonsContainer,
  ButtonWrapper,
  ModalText,
  SyncButton,
} from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  EventsText,
  ModalContent,
  ModalSubText,
  RefreshButton,
} from "./calendar.modals.styled"
import { defineMessages } from "react-intl"

const modalMessages = defineMessages({
  syncCalendarTitle: { id: "view.name.calendar.syncModal.title" },
  syncCalendarSubtitle: { id: "view.name.calendar.syncModal.subtitle" },
  syncCalendarBody: { id: "view.name.calendar.syncModal.body" },
  syncCalendarGoogleButton: { id: "view.name.phone.contacts.googleButtonText" },
  synchronizingBodyHeader: {
    id: "view.name.calendar.synchronizingModal.bodyHeader",
  },
  synchronizingBody: {
    id: "view.name.calendar.synchronizingModal.body",
  },
  syncFinishedTitle: {
    id: "view.name.calendar.syncModal.title",
  },
  syncFinishedBodyHeader: {
    id: "view.name.calendar.synchronizingFinishedModal.bodyHeader",
  },
  syncFinishedBody: {
    id: "view.name.calendar.synchronizingFinishedModal.body",
  },
  syncFailedBodyHeader: {
    id: "view.name.calendar.synchronizingFailedModal.bodyHeader",
  },
  syncFailedBody: {
    id: "view.name.calendar.synchronizingFailedModal.body",
  },
  syncFailedSubText: {
    id: "view.name.calendar.synchronizingFailedModal.subText",
  },
  syncFailedRefreshButton: {
    id: "view.name.calendar.synchronizingFailedModal.refreshButton",
  },
})

interface SyncCalendarModalProps {
  onClose?: () => void
  onGoogleButtonClick?: () => void
}

const SyncModal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <Modal size={size} {...props}>
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export const SyncCalendarModal: FunctionComponent<SyncCalendarModalProps> = ({
  onClose = noop,
  onGoogleButtonClick = noop,
}) => (
  <SyncModal
    size={ModalSize.Small}
    title={intl.formatMessage(modalMessages.syncCalendarTitle)}
    closeButton={false}
    onClose={onClose}
  >
    <RoundIconWrapper>
      <Icon type={Type.CalendarIcon} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={modalMessages.syncCalendarSubtitle}
    />
    <ModalText
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={modalMessages.syncCalendarBody}
    />
    <ButtonsContainer>
      <ButtonWrapper>
        <SyncButton
          displayStyle={DisplayStyle.Primary}
          label={intl.formatMessage(modalMessages.syncCalendarGoogleButton)}
          Icon={Type.Google}
          onClick={onGoogleButtonClick}
        />
      </ButtonWrapper>
    </ButtonsContainer>
  </SyncModal>
)

export const SynchronizingModal = ({ onClose = noop }) => {
  return (
    <SyncModal size={ModalSize.Small} onClose={onClose}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={modalMessages.synchronizingBodyHeader}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={modalMessages.synchronizingBody}
      />
    </SyncModal>
  )
}

export const SynchronizingFinishedModal = ({ onClose = noop }) => (
  <SyncModal
    size={ModalSize.Small}
    onClose={onClose}
    title={intl.formatMessage(modalMessages.syncFinishedTitle)}
  >
    <RoundIconWrapper>
      <Icon type={Type.ThinCheck} width={8} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={modalMessages.syncFinishedBodyHeader}
    />
    <EventsText
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={{
        ...modalMessages.syncFinishedBody,
        values: {
          eventsImported: 12,
          eventsExported: 7,
          eventsUpdated: 3,
          ...textFormatters,
        },
      }}
    />
  </SyncModal>
)

export const SynchronizingFailedModal = ({
  onClose = noop,
  onRefresh = noop,
}) => (
  <SyncModal
    size={ModalSize.Small}
    onClose={onClose}
    closeButton={false}
    title={intl.formatMessage(modalMessages.syncCalendarTitle)}
  >
    <RoundIconWrapper>
      <Icon type={Type.CalendarIcon} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={modalMessages.syncFailedBodyHeader}
    />
    <ModalText
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={modalMessages.syncFailedBody}
    />
    <ModalSubText
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={modalMessages.syncFailedSubText}
    />
    <RefreshButton
      displayStyle={DisplayStyle.Secondary}
      label={intl.formatMessage(modalMessages.syncFailedRefreshButton)}
      Icon={Type.Refresh}
      onClick={onRefresh}
    />
  </SyncModal>
)
