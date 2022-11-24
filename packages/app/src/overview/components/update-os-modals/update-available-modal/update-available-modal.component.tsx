/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import Modal from "react-modal"
import { UpdateAvailableModalProps } from "App/overview/components/update-os-modals/update-available-modal/update-available-modal.interface"
import {
  getModalDialogStyle,
  ModalMainText,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  ModalSize,
  TitleOrder,
} from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import {
  Close,
  Header,
  ModalTitle,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import {
  DisplayStyle,
  Size,
} from "App/__deprecated__/renderer/components/core/button/button.config"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import { getTitleStyle } from "App/__deprecated__/renderer/components/core/modal/modal.helpers"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { CautionSection } from "App/overview/components/update-os-modals/update-available-modal/caution-section-container.component"
import { AboutUpdatesSection } from "App/overview/components/update-os-modals/update-available-modal/about-updates-section.component"

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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }
`

export const UpdateAvailableModal: FunctionComponent<
  UpdateAvailableModalProps
> = ({ open = false, releases, onClose, onDownload }) => {
  return (
    <Modal
      isOpen={open}
      style={getModalDialogStyle({ size: ModalSize.Medium })}
      shouldCloseOnOverlayClick={false}
      onAfterClose={onClose}
    >
      <Header
        titleOrder={TitleOrder.TitleFirst}
        subtitleGap={false}
        data-testid={ModalTestIds.Header}
      >
        <ModalTitle
          displayStyle={getTitleStyle(ModalSize.Small)}
          element={"h2"}
          data-testid={ModalTestIds.Title}
          message={messages.muditaOsUpdateTitle}
        />
        <Close
          displayStyle={DisplayStyle.IconOnly}
          Icon={IconType.Close}
          data-testid={ModalTestIds.CloseButton}
        />
      </Header>
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Pure} width={3.2} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.updateAvailableMessage}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.updateAvailableDescription}
        />
        <AboutUpdatesSection releases={releases} />
        <Button
          displayStyle={DisplayStyle.Primary}
          size={Size.FixedSmall}
          labelMessage={messages.updateAvailableButton}
          onClick={onDownload}
          data-testid={ModalTestIds.ModalActionButton}
        />
        <CautionSection isSingleRelease={releases.length === 1} />
      </ModalContent>
    </Modal>
  )
}
