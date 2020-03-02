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
      <UpdateAvailable />
    </ModalStory>
  ))
  .add("Update is not available", () => (
    <ModalStory>
      <UpdateNotAvailable />
    </ModalStory>
  ))
  .add("Update error", () => (
    <ModalStory>
      <UpdateServerError />
    </ModalStory>
  ))
  .add("Starting download", () => (
    <ModalStory>
      <DownloadingUpdateModal />
    </ModalStory>
  ))
  .add("Downloading", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={30} speed={5678} />
    </ModalStory>
  ))
  .add("Finishing download", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={0} speed={5678} />
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
