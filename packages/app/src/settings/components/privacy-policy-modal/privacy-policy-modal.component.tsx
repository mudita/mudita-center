/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ModalContent,
  ModalDialog,
  RoundIconWrapper,
} from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"

import React, { useEffect } from "react"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import {
  fontWeight,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"
import { useDispatch, useSelector } from "react-redux"
import { togglePrivacyPolicyAccepted } from "App/settings/actions"
import { Dispatch, ReduxRootState } from "App/__deprecated__/renderer/store"
import { deleteCollectingData } from "App/settings/actions/delete-collecting-data.action"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"

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
  const { collectingData } = useSelector(
    (state: ReduxRootState) => state.settings
  )

  const dispatch = useDispatch<Dispatch>()

  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenBrowser)

  const handleAgreeButtonClick = (): void => {
    void dispatch(deleteCollectingData())
    void dispatch(togglePrivacyPolicyAccepted(true))
  }

  useEffect(() => {
    if (collectingData === undefined) {
      void dispatch(togglePrivacyPolicyAccepted(true))
    }
  }, [collectingData, dispatch])

  if (collectingData === undefined) {
    return null
  }

  return (
    <ModalDialog
      open
      layer={ModalLayers.modalLayer8}
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
