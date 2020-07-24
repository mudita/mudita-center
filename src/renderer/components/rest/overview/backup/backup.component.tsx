import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { BackupProps } from "Renderer/components/rest/overview/backup/backup.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { AppSettings } from "App/main/default-app-settings"

const messages = defineMessages({
  lastBackup: { id: "view.name.overview.backup.lastBackup" },
  restoreAction: {
    id: "view.name.overview.backup.restoreAction",
  },
  createFirst: { id: "view.name.overview.backup.createFirst" },
  createAction: {
    id: "view.name.overview.backup.createAction",
  },
})

const LastBackup = styled(CardText)`
  span {
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("disabled")};
    margin-bottom: 1.2rem;
    display: block;
  }
  button {
    margin: -0.8rem;
    margin-top: 1.6rem;
    height: 3rem;
    width: auto;
  }
`

const FirstBackup = styled(CardText)`
  p {
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("disabled")};
  }
`

const Backup: FunctionComponent<BackupProps & Partial<AppSettings>> = ({
  className,
  lastBackup,
  onBackupCreate,
  onBackupRestore = noop,
  language,
}) => (
  <Card className={className}>
    {Boolean(lastBackup) ? (
      <LastBackup>
        <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"span"}>
          <FormattedMessage {...messages.lastBackup} />
        </Text>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          {lastBackup &&
            language &&
            new Date(lastBackup.createdAt).toLocaleDateString(language.tag)}
        </Text>
        <ButtonComponent
          displayStyle={DisplayStyle.Link3}
          onClick={onBackupRestore}
          label={intl.formatMessage(messages.restoreAction)}
        />
      </LastBackup>
    ) : (
      <FirstBackup>
        <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
          <FormattedMessage {...messages.createFirst} />
        </Text>
      </FirstBackup>
    )}
    <CardAction filled>
      <CardActionButton
        active
        label={intl.formatMessage(messages.createAction)}
        Icon={Type.Backup}
        onClick={onBackupCreate}
      />
    </CardAction>
  </Card>
)

export default Backup
