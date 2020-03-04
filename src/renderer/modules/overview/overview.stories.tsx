import { storiesOf } from "@storybook/react"
import React from "react"
import { Provider } from "react-redux"
import store from "Renderer/store"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
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
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import FunctionComponent from "Renderer/types/function-component.interface"

/**
 * Please do not review.
 * This is going to be merged with https://github.com/Appnroll/pure-desktop-app/pull/75
 */
storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "63rem" }}>
    <Provider store={store}>
      <OverviewUI />
    </Provider>
  </div>
))

/**
 * This can be reviewed.
 */
const ModalStory: FunctionComponent = ({ children }) => (
  <div style={{ maxWidth: "63rem" }}>
    <Provider store={store}>
      <OverviewUI />
    </Provider>
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
      <UpdateAvailable version={"1.3"} date={new Date().toISOString()} />
    </ModalStory>
  ))
  .add("Mudita OS is up to date", () => (
    <ModalStory>
      <UpdateNotAvailable version={"1.3"} date={new Date().toISOString()} />
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
