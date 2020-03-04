import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import Loader from "Renderer/components/core/loader/loader.component"
import {
  backgroundColor,
  transitionTime,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import FunctionComponent from "Renderer/types/function-component.interface"
import { DownloadProgress } from "Renderer/interfaces/file-download.interface"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import formatDuration from "Renderer/utils/format-duration"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4.8rem 0;

  p + p {
    margin-top: 1.2rem;
  }

  & + * {
    margin-bottom: 2.8rem;
  }
`

const RoundIconWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background-color: ${backgroundColor("lightBlue")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.2rem;
`

const DownloadBar = styled.div`
  width: 22rem;
  margin-top: 3.2rem;
  height: 0.4rem;
  position: relative;
  border-radius: 0.4rem;
  background-color: ${backgroundColor("grey2")};

  span {
    display: block;
    height: inherit;
    border-radius: inherit;
    background-color: ${backgroundColor("progressBar")};
    transition: width ${transitionTime("faster")} ease-in-out;
  }
`

const OSUpdateModal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <Modal
    size={size}
    title={intl.formatMessage({
      id: "view.name.overview.system.modal.muditaOsUpdate.title",
    })}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export const CheckingUpdatesModal = () => (
  <OSUpdateModal
    closeButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.checkingForUpdates.closeButton",
    })}
  >
    <RoundIconWrapper>
      <Loader />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.checkingForUpdates.message"}
      />
    </Text>
  </OSUpdateModal>
)

export const UpdateAvailable = ({
  onDownload = noop,
  version = "",
  date = "",
}) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.updateAvailable.button",
    })}
    onActionButtonClick={onDownload}
    closeButton={false}
  >
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.updateAvailable.message"}
      />
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.updateAvailable.description"}
        values={{
          version,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }}
      />
    </Text>
  </OSUpdateModal>
)

export const UpdateNotAvailable = ({ version = "", date = "" }) => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.updateNotAvailable.message"}
      />
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.updateAvailable.description"}
        values={{
          version,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }}
      />
    </Text>
  </OSUpdateModal>
)

export const UpdateServerError = ({ onRetry = noop }) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.checkingUpdateFailed.button",
    })}
    onActionButtonClick={onRetry}
  >
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.checkingUpdateFailed.message"}
      />
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.checkingUpdateFailed.description"}
      />
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateModal = ({
  percent = 0,
  speed = 0,
  timeLeft,
  onCancel = noop,
}: Partial<DownloadProgress & { onCancel: () => void }>) => {
  const starting = (
    <FormattedMessage
      id={
        "view.name.overview.system.modal.downloadingUpdate.description.starting"
      }
    />
  )
  const downloading = (
    <FormattedMessage
      id={
        "view.name.overview.system.modal.downloadingUpdate.description.downloading"
      }
      values={{
        speed: convertBytes(speed) + "/s",
        timeLeft: formatDuration(timeLeft || 0),
      }}
    />
  )
  const finishing = (
    <FormattedMessage
      id={
        "view.name.overview.system.modal.downloadingUpdate.description.finishing"
      }
    />
  )
  return (
    <OSUpdateModal
      closeable={false}
      closeButton={false}
      actionButtonLabel={intl.formatMessage({
        id: "view.name.overview.system.modal.downloadingUpdate.button",
      })}
      onActionButtonClick={onCancel}
    >
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        <FormattedMessage
          id={"view.name.overview.system.modal.downloadingUpdate.message"}
        />
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedText}>
        {timeLeft === undefined
          ? starting
          : timeLeft < 1
          ? finishing
          : downloading}
      </Text>
      <DownloadBar>
        <span style={{ width: `${percent}%` }} />
      </DownloadBar>
    </OSUpdateModal>
  )
}

export const DownloadingUpdateFinishedModal = ({ onOsUpdate = noop }) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.downloadCompleted.button",
    })}
    closeButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.downloadCompleted.closeButton",
    })}
    onActionButtonClick={onOsUpdate}
  >
    <RoundIconWrapper>
      <Icon type={Type.Download} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.downloadCompleted.message"}
      />
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.downloadCompleted.description"}
      />
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateCancelledModal = () => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.downloadingCancelled.message"}
      />
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateInterruptedModal = ({ onRetry = noop }) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage({
      id: "view.name.overview.system.modal.downloadingCancelled.button",
    })}
    onActionButtonClick={onRetry}
  >
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.downloadingFailed.message"}
      />
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      <FormattedMessage
        id={"view.name.overview.system.modal.downloadingFailed.description"}
      />
    </Text>
  </OSUpdateModal>
)
