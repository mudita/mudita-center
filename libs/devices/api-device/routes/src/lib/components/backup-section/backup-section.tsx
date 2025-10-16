/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { McOverviewBackup } from "devices/api-device/ui"
import { ApiDevice, McOverview } from "devices/api-device/models"
import { useApiDeviceBackupsQuery } from "devices/api-device/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { CreateBackupFlow } from "./create-backup-flow"
import { RestoreBackupFlow } from "./restore-backup-flow"

enum Flow {
  None,
  Backup,
  Restore,
}

interface Props {
  backupFeatures: NonNullable<McOverview["backup"]>["backupFeatures"]
  restoreFeatures: NonNullable<McOverview["backup"]>["restoreFeatures"]
}

export const BackupSection: FunctionComponent<Props> = ({
  backupFeatures = [],
  restoreFeatures = [],
}) => {
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: backupData, refetch } = useApiDeviceBackupsQuery(device)

  const [flow, setFlow] = useState(Flow.None)

  const createBackup = useCallback(() => {
    setFlow(Flow.Backup)
  }, [])

  const restoreBackup = useCallback(() => {
    setFlow(Flow.Restore)
  }, [])

  const clearFlow = useCallback(() => {
    setFlow(Flow.None)
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return (
    <>
      <McOverviewBackup
        lastBackupDate={backupData?.[0]?.createdAt}
        onCreateBackup={createBackup}
        onRestoreBackup={restoreBackup}
      />
      <CreateBackupFlow
        active={flow === Flow.Backup}
        features={backupFeatures}
        onFinished={clearFlow}
      />
      <RestoreBackupFlow
        active={flow === Flow.Restore}
        backups={backupData}
        features={restoreFeatures}
        onFinished={clearFlow}
      />
    </>
  )
}
