import { storiesOf } from "@storybook/react"
import React from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  CheckingUpdatesModal,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
} from "Renderer/modules/overview/overview.modals"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { lastBackup } from "Renderer/components/rest/overview/backup/backup.stories"

const fakeState = {
  batteryLevel: 0,
  disconnectDevice: false,
  lastBackup,
  osVersion: "3.0",
  osUpdateAvailable: false,
  osUpdateAlreadyDownloaded: false,
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  simCards: [],
  networkName: "Orange",
  osUpdateDate: 1459832991883,
  language: {
    name: "English",
    tag: "en-US",
    shortTag: "en",
  },
}

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <OverviewUI
        {...fakeState}
        disconnectDevice={noop}
        changeSim={noop}
        onUpdateCheck={noop}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={noop}
      />
    </Router>
  </div>
))

const ModalStory: FunctionComponent = ({ children }) => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <OverviewUI
        {...fakeState}
        disconnectDevice={noop}
        changeSim={noop}
        onUpdateCheck={noop}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={noop}
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
        version={fakeState.osVersion + ".1"}
        date={new Date().toISOString()}
      />
    </ModalStory>
  ))
  .add("Mudita OS is up to date", () => (
    <ModalStory>
      <UpdateNotAvailable
        version={fakeState.osVersion}
        date={new Date().toISOString()}
      />
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
