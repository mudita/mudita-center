import { spawnSync, SpawnSyncReturns } from "child_process"
import { FlashDeviceCommandClass } from "./flash-device-command.class"

export class FlashDeviceCommand implements FlashDeviceCommandClass {
  public async exec(imagePath: string): Promise<SpawnSyncReturns<Buffer>> {
    return spawnSync("src/cleanup/macflash.sh", ["-i", imagePath], {
      cwd: process.cwd(),
      stdio: "inherit",
    })
  }
}
