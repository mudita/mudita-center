import { storiesOf } from "@storybook/react"
import React from "react"
import {
  AppUpdateAvailable,
  AppUpdateDownloaded,
} from "Renderer/components/rest/app-update/app-update.modals"
import { ModalBackdrop } from "Renderer/components/core/modal/modal.styled.elements"

storiesOf("App|Update", module)
  .add("Available update", () => {
    return (
      <>
        <ModalBackdrop />
        <AppUpdateAvailable />
      </>
    )
  })
  .add("Downloaded update", () => {
    return (
      <>
        <ModalBackdrop />
        <AppUpdateDownloaded />
      </>
    )
  })
