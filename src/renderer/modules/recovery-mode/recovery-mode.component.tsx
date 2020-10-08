import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  BoldOptionText,
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
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { Message } from "Renderer/interfaces/message.interface"
import { Title } from "Renderer/components/rest/onboarding/onboarding.elements"
import { textFormatters } from "Renderer/utils/intl"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

enum SafeModeAction {
  Backup,
  RebootOs,
  Restore,
  FactoryReset,
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
    iconType: Type.BackupFolder,
    title: messages.backupTitle,
    description: messages.backupDescription,
  },
  {
    action: SafeModeAction.RebootOs,
    iconType: Type.Delete,
    title: messages.rebootOsTitle,
    description: messages.rebootOsDescription,
  },
  {
    action: SafeModeAction.Restore,
    iconType: Type.Delete,
    title: messages.restoreTitle,
    description: messages.restoreDescription,
  },
  {
    action: SafeModeAction.FactoryReset,
    iconType: Type.Delete,
    title: messages.factoryResetTitle,
    description: messages.factoryResetDescription,
  },
]

const RecoveryMode: FunctionComponent<{}> = () => (
  <RecoveryModeWrapper>
    <RecoveryModeHeader>
      <Title
        displayStyle={TextDisplayStyle.PrimaryHeading}
        message={{ ...messages.title, values: textFormatters }}
      />
      <Text
        displayStyle={TextDisplayStyle.LargeFadedText}
        message={messages.description}
      />
    </RecoveryModeHeader>
    <OptionsWrapper>
      {safeModeOptions.map(({ action, iconType, title, description }) => (
        <OptionButton key={action}>
          <OptionBox>
            <OptionBoxIcon type={iconType} size={IconSize.Bigger} />
            <TextWrapper>
              <BoldOptionText
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
      ))}
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
          data-testid="contact-support"
        />
      </Support>
    </RecoveryModeFooter>
  </RecoveryModeWrapper>
)

export default RecoveryMode
