import { SpawnSyncReturns } from "child_process"

export interface DecompressTarCommandClass {
  exec(
    archivePath: string,
    destinationDirectory: string
  ): Promise<SpawnSyncReturns<Buffer>>
}
