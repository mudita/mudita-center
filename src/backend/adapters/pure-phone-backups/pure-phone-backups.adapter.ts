import PurePhoneBackupAdapter from "Backend/adapters/pure-phone-backups/pure-phone-backups-adapter.class"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import { app } from "electron"
import { name } from "../../../../package.json"
import fs from "fs-extra"
import path from "path"
import moment from "moment"

class PurePhoneBackups extends PurePhoneBackupAdapter {
  public async getBackups(): Promise<BackupItemInfo[]> {
    const settingsFilePath = `${app.getPath("appData")}/${name}/settings.json`

    const { pureOsBackupLocation } = await fs.readJson(settingsFilePath)
    const backups: BackupItemInfo[] = []

    const regex = /^pure_backup_(\d{12})\.zip$/m

    if (await fs.pathExists(pureOsBackupLocation)) {
      for (const fileName of await fs.readdir(pureOsBackupLocation)) {
        if (regex.test(fileName)) {
          const { size } = await fs.stat(
            path.join(pureOsBackupLocation, fileName)
          )

          const datetime = fileName.match(regex)?.[1]
          const createdAt = moment(datetime, "YYYYMMDDhhmm").format()

          backups.push({
            createdAt,
            size,
          })
        }
      }
    }

    return backups
  }
}

const createPurePhoneBackupsAdapter = (): PurePhoneBackupAdapter =>
  new PurePhoneBackups()

export default createPurePhoneBackupsAdapter
