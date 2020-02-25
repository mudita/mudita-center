// System update modals
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import StackedBarChart, {
  Bar,
  DisplayStyle,
  Progress,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import React from "react"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import Loader from "Renderer/components/core/loader/loader.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ipcRenderer } from "electron-better-ipc"
import FunctionComponent from "Renderer/types/function-component.interface"

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

const DownloadBar = styled(StackedBarChart)`
  width: 22rem;
  margin-top: 3.2rem;

  ${Progress} {
    width: 100%;
  }
  ${Bar} {
    transition: width 0.4s ease-in-out;
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

interface DownloadingModalProps {
  progress?: number
  estimatedTime?: number
}

export const DownloadingUpdateModal = ({
  progress = 0,
  estimatedTime = Infinity,
}: DownloadingModalProps) => {
  const cancelDownload = () => {
    ipcRenderer.send("cancel-download")
  }
  const infiniteTime = <span>Starting download...</span>
  const finiteTime = (
    <span>
      Estimated time left: {Math.ceil(estimatedTime)} second
      {estimatedTime <= 1 ? "" : "s"}.
    </span>
  )
  const zeroTime = <span>Finishing download...</span>
  return (
    <OSUpdateModal
      closeable={false}
      closeButton={false}
      actionButtonLabel={"Abort"}
      onActionButtonClick={cancelDownload}
    >
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        <span>Downloading update...</span>
      </Text>
      <Text displayStyle={TextDisplayStyle.MediumFadedText}>
        {!isFinite(estimatedTime)
          ? infiniteTime
          : estimatedTime === 0
          ? zeroTime
          : finiteTime}
      </Text>
      <DownloadBar
        chartData={[
          { value: progress, color: "#e3f3ff" },
          { value: 100 - progress, color: "#f4f5f6" },
        ]}
        displayStyle={DisplayStyle.Simple}
      />
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
  </OSUpdateModal>
)
