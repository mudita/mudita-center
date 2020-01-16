import StorageInfo from "Common/interfaces/storage-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getStorageInfo = (): Promise<StorageInfo> =>
  ipcRenderer.callMain(IpcRequest.GetStorageInfo) as Promise<StorageInfo>

export default getStorageInfo
