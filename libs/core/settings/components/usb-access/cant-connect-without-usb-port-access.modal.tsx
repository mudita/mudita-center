/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import {
  ModalDialog,
  ModalContent,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: { id: "component.cantConnectWithoutUSBPortAccessTitle" },
  body: { id: "component.cantConnectWithoutUSBPortAccessBody" },
})

const CantConnectWithoutUSBPortAccessModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => (
  <ModalDialog size={ModalSize.Small} {...props}>
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={IconType.ThinFail} width={3.2} />
      </RoundIconWrapper>
      <Text
        message={messages.title}
        displayStyle={TextDisplayStyle.Headline4}
      />
      <Text
        message={messages.body}
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
      />
    </ModalContent>
  </ModalDialog>
)

export default CantConnectWithoutUSBPortAccessModal
