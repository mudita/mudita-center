/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import {
  CheckingUpdatesModal,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
  UpdatingFailureWithHelpModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "App/overview/components/overview-modals.component"
import { UpdatingForceModal } from "App/overview/components/overview.modal-dialogs"
import OverviewContent from "App/overview/components/overview-screens/pure-overview/overview-content.component"
import { CaseColour, DeviceType } from "@mudita/pure"

type Props = ComponentProps<typeof OverviewContent>

const defaultProps: Props = {
  deviceType: DeviceType.MuditaPure,
  appAutostart: false,
  appCollectingData: undefined,
  appConversionFormat: undefined,
  appConvert: undefined,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appNonStandardAudioFilesConversion: false,
  appOsUpdates: false,
  appTethering: false,
  appTray: false,
  batteryLevel: 0,
  caseColour: CaseColour.Gray,
  changeSim: noop,
  diagnosticSentTimestamp: 0,
  disconnectDevice: noop,
  language: "",
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  networkName: "Orange",
  onBackupCreate: noop,
  onUpdateCheck: noop,
  onUpdateDownload: noop,
  onUpdateInstall: noop,
  osVersion: "3.0",
  pureNeverConnected: false,
  pureOsBackupLocation: "",
  pureOsDownloadLocation: "",
  simCards: [],
  serialNumber: "123456",
}

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <OverviewContent
        {...defaultProps}
        disconnectDevice={action("Disconnect device")}
        changeSim={action("Changing sim")}
        onUpdateCheck={action("Checking update")}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={action("Starting backup creation")}
        onOpenBackupRestorationModal={action("Starting backup restoration")}
        toggleAppCollectingData={noop}
      />
    </Router>
  </div>
))

const ModalStory: FunctionComponent = ({ children }) => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <OverviewContent
        {...defaultProps}
        disconnectDevice={action("Disconnect device")}
        changeSim={action("Changing sim")}
        onUpdateCheck={action("Checking update")}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={action("Starting backup creation")}
        onOpenBackupRestorationModal={action("Starting backup restoration")}
        toggleAppCollectingData={noop}
      />
    </Router>
    <ModalWrapper>{children}</ModalWrapper>
    <ModalBackdrop />
  </div>
)

storiesOf("Views|Overview/Modals", module)
  .add("Checking for updates", () => (
    <ModalStory>
      <CheckingUpdatesModal />
    </ModalStory>
  ))
  .add("Update is available", () => (
    <ModalStory>
      <UpdateAvailable
        version={defaultProps.osVersion + ".1"}
        date={new Date().toISOString()}
      />
    </ModalStory>
  ))
  .add("Mudita OS is up to date", () => (
    <ModalStory>
      <UpdateNotAvailable version={defaultProps.osVersion} />
    </ModalStory>
  ))
  .add("Checking for update failed", () => (
    <ModalStory>
      <UpdateServerError />
    </ModalStory>
  ))
  .add("Starting download", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={undefined} />
    </ModalStory>
  ))
  .add("Downloading", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={97} speed={56789} percent={34} />
    </ModalStory>
  ))
  .add("Finishing download", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={0} percent={100} />
    </ModalStory>
  ))
  .add("Downloading finished", () => (
    <ModalStory>
      <DownloadingUpdateFinishedModal />
    </ModalStory>
  ))
  .add("Downloading cancelled", () => (
    <ModalStory>
      <DownloadingUpdateCancelledModal />
    </ModalStory>
  ))
  .add("Downloading interrupted", () => (
    <ModalStory>
      <DownloadingUpdateInterruptedModal />
    </ModalStory>
  ))
  .add("Updating force ", () => (
    <ModalStory>
      <UpdatingForceModal open onActionButtonClick={action("Run Update")} />
    </ModalStory>
  ))
  .add("Updating spinner progress", () => (
    <ModalStory>
      <UpdatingSpinnerModal />
    </ModalStory>
  ))
  .add("Updating success", () => (
    <ModalStory>
      <UpdatingSuccessModal />
    </ModalStory>
  ))
  .add("Updating failure with help", () => (
    <ModalStory>
      <UpdatingFailureWithHelpModal
        onContact={action("Go to support")}
        onHelp={action("Go to Help")}
      />
    </ModalStory>
  ))
