import { storiesOf } from "@storybook/react"
import React from "react"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { action } from "@storybook/addon-actions"
const fakeBackupInfo = getFakeAdapters().pureBackups.getBackups()[0]

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

export const lastBackup = new Date(fakeBackupInfo.createdAt).toLocaleDateString(
  "en-US"
)

storiesOf("Overview|Backup", module).add("Backup", () => (
  <div style={{ maxWidth: "63rem" }}>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>No backup available</Text>
      <Backup onBackupCreate={action("create backup")} />
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>
        A backup is available
      </Text>
      <Backup
        lastBackup={lastBackup}
        onBackupCreate={action("create backup")}
        onBackupRestore={action("restore backup")}
      />
    </Part>
  </div>
))
