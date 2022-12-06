/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { AboutUpdatesSection } from "App/overview/components/update-os-modals/update-available-modal/about-updates-section.component"
import { CautionSection } from "App/overview/components/update-os-modals/update-available-modal/caution-section.component"
import { UpdateAvailableModalProps } from "App/overview/components/update-os-modals/update-available-modal/update-available-modal.interface"
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
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updateAvailableMessage: {
    id: "module.overview.updateAvailableMessage",
  },
  updateAvailableDescription: {
    id: "module.overview.updateAvailableDescription",
  },
  updateAvailableButton: {
    id: "module.overview.updateAvailableButton",
  },
})

export const UpdateAvailableModal: FunctionComponent<UpdateAvailableModalProps> =
  ({ open = false, releases, onClose, onDownload, testId }) => {
    const handleDownloadButtonClick = (_event: unknown) => {
      onDownload()
    }
    return (
      <OSUpdateModal
        open={open}
        testId={testId}
        closeable
        closeModal={onClose}
        size={ModalSize.Medium}
      >
        <RoundIconWrapper>
          <Icon type={IconType.Pure} width={3.2} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={{
            ...messages.updateAvailableMessage,
            values: { num: releases.length },
          }}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={{
            ...messages.updateAvailableDescription,
            values: { num: releases.length },
          }}
        />
        <AboutUpdatesSection releases={releases} />
        <Button
          displayStyle={DisplayStyle.Primary}
          size={Size.FixedSmall}
          labelMessage={{
            ...messages.updateAvailableButton,
            values: { num: releases.length },
          }}
          onClick={handleDownloadButtonClick}
          data-testid={ModalTestIds.ModalActionButton}
        />
        <CautionSection isSingleRelease={releases.length === 1} />
      </OSUpdateModal>
    )
  }
