/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ForceUpdateAvailableModalProps } from "App/overview/components/update-os-modals/force-update-available-modal/force-update-available-modal.interface"
import { ForceUpdateDescription } from "App/overview/components/update-os-modals/force-update-available-modal/force-update-available-modal.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { AboutUpdatesSection } from "App/overview/components/update-os-modals/update-available-modal/about-updates-section.component"
import { CautionSection } from "App/overview/components/update-os-modals/update-available-modal/caution-section.component"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "App/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updatingForceTitle: {
    id: "module.overview.updatingForceTitle",
  },
  updatingForceDescription: {
    id: "module.overview.updatingForceDescription",
  },
  updatingForceButton: {
    id: "module.overview.updatingForceButton",
  },
})

export const ForceUpdateAvailableModal: FunctionComponent<ForceUpdateAvailableModalProps> =
  ({ open, releases, onUpdate, testId }) => {
    const handleButtonClick = (_event: unknown) => {
      onUpdate()
    }

    return (
      <OSUpdateModal open={open} testId={testId} size={ModalSize.Medium}>
        <RoundIconWrapper>
          <Icon type={IconType.Pure} width={3.2} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={{
            ...messages.updatingForceTitle,
          }}
        />
        <ForceUpdateDescription
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.updatingForceDescription,
          }}
        />
        <AboutUpdatesSection releases={releases} />
        <Button
          displayStyle={DisplayStyle.Primary}
          size={Size.FixedSmall}
          labelMessage={{
            ...messages.updatingForceButton,
          }}
          onClick={handleButtonClick}
          data-testid={ModalTestIds.ModalActionButton}
        />
        <CautionSection isSingleRelease={releases.length === 1} />
      </OSUpdateModal>
    )
  }
