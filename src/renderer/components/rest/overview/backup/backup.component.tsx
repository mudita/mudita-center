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
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"

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

const Backup: FunctionComponent<BackupProps> = ({
  className,
  lastBackup,
  onBackupCreate,
  onBackupRestore = noop,
}) => (
  <Card className={className}>
    {Boolean(lastBackup) ? (
      <LastBackup>
        <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"span"}>
          <FormattedMessage id="view.name.overview.backup.lastBackup" />
        </Text>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          {lastBackup?.createdAt.toLocaleDateString("en-US")}
        </Text>
        <ButtonComponent
          displayStyle={DisplayStyle.Link3}
          onClick={onBackupRestore}
          label={intl.formatMessage({
            id: "view.name.overview.backup.restoreAction",
          })}
        />
      </LastBackup>
    ) : (
      <FirstBackup>
        <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
          <FormattedMessage id="view.name.overview.backup.createFirst" />
        </Text>
      </FirstBackup>
    )}
    <CardAction filled>
      <CardActionButton
        active
        label={intl.formatMessage({
          id: "view.name.overview.backup.createAction",
        })}
        Icon={Type.Backup}
        onClick={onBackupCreate}
      />
    </CardAction>
  </Card>
)

export default Backup
