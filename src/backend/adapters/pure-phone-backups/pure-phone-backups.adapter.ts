import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import { app } from "electron"
import { name } from "../../../../package.json"
import fs from "fs-extra"
import path from "path"

class PurePhoneBackups extends PurePhoneBackupAdapter {
  public getBackups(): BackupItemInfo[] {
    const settingsFilePath = `${app.getPath("appData")}/${name}/settings.json`

    const { pureOsBackupLocation } = fs.readJsonSync(settingsFilePath)
    const backups: BackupItemInfo[] = []

    if (fs.existsSync(pureOsBackupLocation)) {
      fs.readdirSync(pureOsBackupLocation).forEach((fileName) => {
        if (/^pure_backup_\d{12}\.zip$/m.test(fileName)) {
          const { birthtime, size } = fs.statSync(
            path.join(pureOsBackupLocation, fileName)
          )

          backups.push({
            createdAt: birthtime,
            size,
          })
        }
      })
    }

    return backups
  }
}

const createPurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackups()

export default createPurePhoneBackupsAdapter
