import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

class PurePhoneBackupsFake extends PurePhoneBackupAdapter {
  public getBackups(): BackupItemInfo[] {
    return [
      {
        createdAt: new Date("2020-01-01"),
        size: 100000,
      },
    ]
  }
}

const createFakePurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackupsFake()

export default createFakePurePhoneBackupsAdapter
