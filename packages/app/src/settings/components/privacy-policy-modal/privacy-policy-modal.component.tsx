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

import React from "react"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"

const PrivacyPolicyModal = () => {
  return (
    <ModalDialog
      open={true}
      zIndex={100}
      size={ModalSize.Small}
      title="Privacy Policy"
      actionButtonLabel="asdasd"
      onActionButtonClick={() => {
        console.log("agree")
      }}
      closeButton={false}
      closeModal={() => {
        console.log("close app")
      }}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.MuditaLogo} width={4.8} />
        </RoundIconWrapper>
        <ModalText displayStyle={TextDisplayStyle.Headline4}>
          Read and accept the Privacy policy
        </ModalText>
        <ModalText displayStyle={TextDisplayStyle.Paragraph4}>
          Please read and agree to the Privacy policy to be able to use Mudita
          Center.
        </ModalText>
        Read the Privacy Policy
      </ModalContent>
    </ModalDialog>
  )
}

export default PrivacyPolicyModal
