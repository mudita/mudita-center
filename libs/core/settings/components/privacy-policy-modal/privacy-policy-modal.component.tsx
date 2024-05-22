/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { useDispatch } from "react-redux"
import { ipcRenderer } from "electron-better-ipc"
import styled from "styled-components"
import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import {
  fontWeight,
  textColor,
} from "Core/core/styles/theming/theme-getters"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { AboutActions } from "Core/__deprecated__/common/enums/about-actions.enum"
import { togglePrivacyPolicyAccepted } from "Core/settings/actions"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const messages = defineMessages({
  privacyPolicyModalTitle: { id: "module.settings.privacyPolicyModalTitle" },
  privacyPolicyModalHeader: { id: "module.settings.privacyPolicyModalHeader" },
  privacyPolicyModalDescription: {
    id: "module.settings.privacyPolicyModalDescription",
  },
  privacyPolicyModalLink: { id: "module.settings.privacyPolicyModalLink" },
  privacyPolicyModalButton: { id: "module.settings.privacyPolicyModalButton" },
})

const PrivacyPolicyLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: ${fontWeight("default")};
  color: ${textColor("action")};
`

export const DescriptionText = styled(Text)`
  text-align: center;
  margin: 0.8rem 0 2.2rem 0;
`

const PrivacyPolicyModal: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()

  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenBrowser)

  const handleAgreeButtonClick = (): void => {
    void dispatch(togglePrivacyPolicyAccepted(true))
  }

  return (
    <ModalDialog
      open
      layer={ModalLayers.PrivacyPolicy}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.privacyPolicyModalTitle)}
      actionButtonLabel={intl.formatMessage(messages.privacyPolicyModalButton)}
      onActionButtonClick={handleAgreeButtonClick}
      closeButton={false}
      closeModal={() => {
        close()
      }}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.MuditaLogo} width={4.8} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.privacyPolicyModalHeader}
        />
        <DescriptionText
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.privacyPolicyModalDescription}
        />
        <PrivacyPolicyLink onClick={openPrivacyPolicyWindow}>
          {intl.formatMessage(messages.privacyPolicyModalLink)}
        </PrivacyPolicyLink>
      </ModalContent>
    </ModalDialog>
  )
}

export default PrivacyPolicyModal
