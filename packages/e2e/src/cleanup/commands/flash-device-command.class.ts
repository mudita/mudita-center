import { SpawnSyncReturns } from "child_process"

export interface FlashDeviceCommandClass {
  exec(imagePath: string): Promise<SpawnSyncReturns<Buffer>>
}
