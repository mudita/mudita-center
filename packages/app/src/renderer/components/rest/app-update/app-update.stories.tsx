import { storiesOf } from "@storybook/react"
import React from "react"
import {
  AppUpdateAvailable,
  AppUpdateDownloaded,
  AppUpdateError,
} from "Renderer/components/rest/app-update/app-update.modals"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"

storiesOf("App/Update", module)
  .add("Available update", () => {
    return (
      <div>
        <ModalBackdrop />
        <ModalWrapper>
          <AppUpdateAvailable />
        </ModalWrapper>
      </div>
    )
  })
  .add("Downloaded update", () => {
    return (
      <div>
        <ModalBackdrop />
        <ModalWrapper>
          <AppUpdateDownloaded />
        </ModalWrapper>
      </div>
    )
  })
  .add("Update error", () => {
    return (
      <div>
        <ModalBackdrop />
        <ModalWrapper>
          <AppUpdateError />
        </ModalWrapper>
      </div>
    )
  })
