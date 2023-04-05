/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardBody,
  CardContent,
  CardHeader,
  CardText,
} from "App/overview/components/card.elements"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages, FormattedMessage } from "react-intl"
import styled from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { Settings } from "App/settings/dto"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import moment from "moment"

const messages = defineMessages({
  lastBackup: { id: "module.overview.backupLastBackup" },
  restoreAction: {
    id: "module.overview.backupRestoreAction",
  },
  createFirst: { id: "module.overview.backupCreateFirst" },
  createAction: {
    id: "module.overview.backupCreateAction",
  },
  backupInfoTitle: {
    id: "module.overview.backupInfoTitle",
  },
  backupInfoBackupAvaibleDescription: {
    id: "module.overview.backupInfoBackupAvaibleDescription",
  },
  backupInfoBackupNotAvaibleDescription: {
    id: "module.overview.backupInfoBackupNotAvaibleDescription",
  },
})

const RestoreButtonContainer = styled.div`
  margin-left: 0.8rem;

  button {
    margin-bottom: -0.9rem;
  }
`

interface Props {
  lastBackupDate?: Date
  onBackupCreate: () => void
  onBackupRestore?: () => void
  backupActionDisabled: boolean
}

const Backup: FunctionComponent<Props & Partial<Settings>> = ({
  lastBackupDate,
  onBackupCreate,
  onBackupRestore = noop,
  backupActionDisabled,
  ...props
}) => (
  <Card {...props}>
    <CardHeader>
      <FormattedMessage {...messages.backupInfoTitle} />
    </CardHeader>
    <CardBody>
      {lastBackupDate !== undefined ? (
        <CardContent>
          <CardText>
            <Text displayStyle={TextDisplayStyle.Paragraph4}>
              <FormattedMessage
                {...messages.backupInfoBackupAvaibleDescription}
              />
            </Text>
            <Text
              displayStyle={TextDisplayStyle.Paragraph1}
              data-testid={SystemTestIds.BackupDate}
            >
              {moment(lastBackupDate).format("MMMM D, YYYY")}
            </Text>
          </CardText>
          <RestoreButtonContainer>
            <Button
              displayStyle={DisplayStyle.ActionLink}
              onClick={onBackupRestore}
              labelMessage={messages.restoreAction}
            />
          </RestoreButtonContainer>
        </CardContent>
      ) : (
        <CardContent>
          <CardText>
            <Text displayStyle={TextDisplayStyle.Paragraph4}>
              <FormattedMessage
                {...messages.backupInfoBackupNotAvaibleDescription}
              />
            </Text>
          </CardText>
        </CardContent>
      )}
      <CardAction filled>
        <CardActionButton
          active
          labelMessage={messages.createAction}
          onClick={onBackupCreate}
          disabled={backupActionDisabled}
        />
      </CardAction>
    </CardBody>
  </Card>
)

export default Backup
