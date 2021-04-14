/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { BackupProps } from "Renderer/components/rest/overview/backup/backup.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { AppSettings } from "App/main/store/settings.interface"
import TranslationMessages from "Renderer/components/core/translations-tooltip/translation-messages.component"

const messages = defineMessages({
  lastBackup: { id: "view.name.overview.backup.lastBackup" },
  restoreAction: {
    id: "view.name.overview.backup.restoreAction",
  },
  createFirst: { id: "view.name.overview.backup.createFirst" },
})

const LastBackup = styled(CardText)`
  span {
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("secondary")};
    margin-bottom: 1.2rem;
    display: block;
  }

  button {
    margin: 1.6rem -0.8rem -0.8rem;
    height: 3rem;
    width: auto;
  }
`

const FirstBackup = styled(CardText)`
  p {
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("secondary")};
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
    {lastBackup ? (
      <LastBackup>
        <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"span"}>
          <TranslationMessages {...messages.lastBackup} />
        </Text>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          {new Date(lastBackup.createdAt).toLocaleDateString(language)}
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
          <TranslationMessages {...messages.createFirst} />
        </Text>
      </FirstBackup>
    )}
    <CardAction filled>
      <CardActionButton
        active
        labelMessage={{ id: "view.name.overview.backup.createAction" }}
        Icon={Type.Backup}
        onClick={onBackupCreate}
      />
    </CardAction>
  </Card>
)

export default Backup
