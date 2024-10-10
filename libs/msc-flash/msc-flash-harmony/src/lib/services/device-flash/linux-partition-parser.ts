/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class LinuxPartitionParser {
  public static parsePartitions(execOutput: string): string[] {
    const partitions: string[] = [];
    const lines = execOutput.split("\n");

    let deviceName: string | null = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line || line.startsWith("NAME") || line.startsWith("MOUNTPOINT")) {
        continue;
      }

      const name = LinuxPartitionParser.extractName(line);

      if (!name) {
        continue;
      }

      if (!deviceName) {
        deviceName = name;
        continue;
      }

      if (name !== deviceName) {
        partitions.push(name);
      }
    }

    return partitions;
  }

  private static extractName(line: string): string | null {
    const match = /^\W*(\w+)/.exec(line);
    return match ? match[1] : null;
  }
}

export default LinuxPartitionParser;
