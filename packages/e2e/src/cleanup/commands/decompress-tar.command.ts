import { spawnSync, SpawnSyncReturns } from "child_process"

export class DecompressTarCommand {
  public async exec(
    archivePath: string,
    destinationDirectory: string
  ): Promise<SpawnSyncReturns<Buffer>> {
    return spawnSync("tar", ["-xvf", archivePath, "-C", destinationDirectory], {
      cwd: process.cwd(),
      stdio: "inherit",
    })
  }
}
