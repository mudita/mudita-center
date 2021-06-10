/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import {
  AppUpdateAvailable,
  AppUpdateDownloaded,
  AppUpdateError,
} from "Renderer/wrappers/app-update-step-modal/app-update.modals"
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
          <AppUpdateAvailable open />
        </ModalWrapper>
      </div>
    )
  })
  .add("Downloaded update", () => {
    return (
      <div>
        <ModalBackdrop />
        <ModalWrapper>
          <AppUpdateDownloaded open />
        </ModalWrapper>
      </div>
    )
  })
  .add("Update error", () => {
    return (
      <div>
        <ModalBackdrop />
        <ModalWrapper>
          <AppUpdateError open />
        </ModalWrapper>
      </div>
    )
  })
