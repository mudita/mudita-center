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
import { DownloadProgress } from "App/main/functions/register-download-listener"
import { cancelOsDownload } from "Renderer/requests/download-os-update.request"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4.8rem 0;

  p + p {
    margin-top: 1.2rem;
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
  title = "Pure OS",
  ...props
}) => (
  <Modal size={size} title={title} {...props}>
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export const CheckingUpdatesModal = () => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Loader />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Checking for OS updates...
    </Text>
  </OSUpdateModal>
)

export const UpdateAvailable = ({
  downloadActionHandler = noop,
  version = "",
}) => (
  <OSUpdateModal
    actionButtonLabel="Download"
    onActionButtonClick={downloadActionHandler}
  >
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      New update available
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      PureOS v{version} (released on 01/01/2020)
    </Text>
  </OSUpdateModal>
)

export const UpdateNotAvailable = () => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Your Pure OS is up to date
    </Text>
  </OSUpdateModal>
)

export const UpdateServerError = ({ retryHandler = noop }) => (
  <OSUpdateModal actionButtonLabel={"Retry"} onActionButtonClick={retryHandler}>
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Update cannot be performed
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      Please check your internet connection and try again.
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateModal = ({
  percent = 0,
  timeLeft = Infinity,
  speed = 0,
}: Partial<DownloadProgress>) => {
  const infiniteTime = <span>Starting download...</span>
  const finiteTime = (
    <span>
      Estimated time left: {Math.ceil(timeLeft)} second
      {timeLeft <= 1 ? "" : "s"}. Current speed: {Math.round(speed / 1024)} KB/s
    </span>
  )
  const zeroTime = <span>Finishing download...</span>
  return (
    <OSUpdateModal
      closeable={false}
      closeButton={false}
      actionButtonLabel={"Abort"}
      onActionButtonClick={cancelOsDownload}
    >
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        <span>Downloading update...</span>
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedText}>
        {!isFinite(timeLeft)
          ? infiniteTime
          : timeLeft === 0
          ? zeroTime
          : finiteTime}
      </Text>
      <DownloadBar>
        <span style={{ width: `${percent}%` }} />
      </DownloadBar>
    </OSUpdateModal>
  )
}

export const DownloadingUpdateFinishedModal = ({ osUpdateHandler = noop }) => (
  <OSUpdateModal
    actionButtonLabel="Update now"
    onActionButtonClick={osUpdateHandler}
  >
    <RoundIconWrapper>
      <Icon type={Type.Download} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Download completed
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateCancelledModal = () => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={Type.Close} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Download cancelled
    </Text>
  </OSUpdateModal>
)

export const DownloadingUpdateInterruptedModal = ({ retryHandler = noop }) => (
  <OSUpdateModal actionButtonLabel={"Retry"} onActionButtonClick={retryHandler}>
    <RoundIconWrapper>
      <Icon type={Type.Close} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>
      Download interrupted
    </Text>
    <Text displayStyle={TextDisplayStyle.MediumFadedText}>
      Please check your internet connection and try again.
    </Text>
  </OSUpdateModal>
)
