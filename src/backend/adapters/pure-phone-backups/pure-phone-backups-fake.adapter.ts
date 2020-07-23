import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

class PurePhoneBackupsFake extends PurePhoneBackupAdapter {
  public async getBackups(): Promise<BackupItemInfo[]> {
    return [
      {
        createdAt: "2020-01-15T07:35:01.562Z",
        size: 1234,
      },
    ]
  }
}

const createFakePurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackupsFake()

export default createFakePurePhoneBackupsAdapter
