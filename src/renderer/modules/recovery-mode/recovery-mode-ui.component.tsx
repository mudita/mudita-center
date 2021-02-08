/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  DescriptionText,
  OptionBox,
  OptionBoxIcon,
  OptionButton,
  OptionsWrapper,
  OptionText,
  RecoveryModeFooter,
  RecoveryModeHeader,
  RecoveryModeWrapper,
  Support,
  SupportText,
  TextWrapper,
} from "Renderer/components/rest/recovery-mode/recovery-mode.styled"
import { Title } from "Renderer/components/rest/onboarding/onboarding.elements"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { textFormatters } from "Renderer/utils/intl"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { defineMessages } from "react-intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Message } from "Renderer/interfaces/message.interface"

export enum SafeModeAction {
  Backup = "backup",
  RebootOs = "reboot-os",
  Restore = "restore",
  FactoryReset = "factory-reset",
}

interface SafeModeOption {
  readonly action: SafeModeAction
  readonly iconType: Type
  readonly title: Message
  readonly description: Message
}

const messages = defineMessages({
  title: {
    id: "view.name.recoveryMode.title",
  },
  description: {
    id: "view.name.recoveryMode.description",
  },
  backupTitle: {
    id: "view.name.recoveryMode.backupTitle",
  },
  backupDescription: {
    id: "view.name.recoveryMode.backupDescription",
  },
  rebootOsTitle: {
    id: "view.name.recoveryMode.rebootOsTitle",
  },
  rebootOsDescription: {
    id: "view.name.recoveryMode.rebootOsDescription",
  },
  restoreTitle: {
    id: "view.name.recoveryMode.restoreTitle",
  },
  restoreDescription: {
    id: "view.name.recoveryMode.restoreDescription",
  },
  factoryResetTitle: {
    id: "view.name.recoveryMode.factoryResetTitle",
  },
  factoryResetDescription: {
    id: "view.name.recoveryMode.factoryResetDescription",
  },
  supportMessage: {
    id: "view.name.recoveryMode.supportMessage",
  },
  supportButtonText: {
    id: "view.name.onboarding.troubleshooting.support.button",
  },
})

const safeModeOptions: SafeModeOption[] = [
  {
    action: SafeModeAction.Backup,
    iconType: Type.RecoveryBackup,
    title: messages.backupTitle,
    description: messages.backupDescription,
  },
  {
    action: SafeModeAction.RebootOs,
    iconType: Type.RebootOs,
    title: messages.rebootOsTitle,
    description: messages.rebootOsDescription,
  },
  {
    action: SafeModeAction.Restore,
    iconType: Type.RebootOs,
    title: messages.restoreTitle,
    description: messages.restoreDescription,
  },
  {
    action: SafeModeAction.FactoryReset,
    iconType: Type.FactoryReset,
    title: messages.factoryResetTitle,
    description: messages.factoryResetDescription,
  },
]
interface Props {
  onSupportButtonClick: () => void
  onBackupClick: () => void
  onRebootOsClick: () => void
  onRestoreClick: () => void
  onFactoryResetClick: () => void
}

const RecoveryModeUI: FunctionComponent<Props> = ({
  onSupportButtonClick,
  onBackupClick,
  onRebootOsClick,
  onRestoreClick,
  onFactoryResetClick,
}) => {
  const safeModeActionMap: Record<SafeModeAction, () => void> = {
    [SafeModeAction.Backup]: onBackupClick,
    [SafeModeAction.RebootOs]: onRebootOsClick,
    [SafeModeAction.Restore]: onRestoreClick,
    [SafeModeAction.FactoryReset]: onFactoryResetClick,
  }
  return (
    <RecoveryModeWrapper>
      <RecoveryModeHeader>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{ ...messages.title, values: textFormatters }}
        />
        <DescriptionText
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={messages.description}
        />
      </RecoveryModeHeader>
      <OptionsWrapper>
        {safeModeOptions.map(({ action, iconType, title, description }) => {
          return (
            <OptionButton key={action} onClick={safeModeActionMap[action]}>
              <OptionBox>
                <OptionBoxIcon type={iconType} size={IconSize.Big} />
                <TextWrapper>
                  <Text
                    displayStyle={TextDisplayStyle.TertiaryHeading}
                    message={title}
                    element={"p"}
                  />
                  <OptionText
                    displayStyle={TextDisplayStyle.MediumFadedLightText}
                    message={description}
                  />
                </TextWrapper>
              </OptionBox>
            </OptionButton>
          )
        })}
      </OptionsWrapper>
      <RecoveryModeFooter>
        <Support>
          <SupportText
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={messages.supportMessage}
          />
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={messages.supportButtonText}
            onClick={onSupportButtonClick}
          />
        </Support>
      </RecoveryModeFooter>
    </RecoveryModeWrapper>
  )
}

export default RecoveryModeUI
