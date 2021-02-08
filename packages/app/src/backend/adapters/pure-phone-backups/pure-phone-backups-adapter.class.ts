import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneBackupAdapter {
  public abstract getBackups(): Promise<DeviceResponse<BackupItemInfo[]>>
}
