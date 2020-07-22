import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import path from "path"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export enum PureBackupEvents {
  Get = "get-pure-backup",
}

const registerPureBackupListeners = () => {
  const settingsFilePath = `${app.getPath("appData")}/${name}/settings.json`

  ipcMain.answerRenderer(PureBackupEvents.Get, async () => {
    const { pureOsBackupLocation } = await fs.readJson(settingsFilePath)
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

    return { backups }
  })
}

export default registerPureBackupListeners
