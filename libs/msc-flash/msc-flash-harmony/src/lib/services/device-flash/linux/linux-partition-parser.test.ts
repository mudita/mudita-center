/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import LinuxPartitionParser from "./linux-partition-parser"

describe("LinuxPartitionParser", () => {
  test("correctly parses partitions from 'sdb' device output", () => {
    const execOutput = `
NAME   MOUNTPOINT
sdb
├─sdb1 /media/system_a
├─sdb2 /media/system_b
└─sdb3 /media/user
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual(["sdb1", "sdb2", "sdb3"])
  })

  test("correctly parses partitions from a device with a custom name", () => {
    const execOutput = `
NAME        MOUNTPOINT
nvme0n1
├─nvme0n1p1 /boot
├─nvme0n1p2 /
└─nvme0n1p3 /home
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual(["nvme0n1p1", "nvme0n1p2", "nvme0n1p3"])
  })

  test("returns an empty array when no partitions are found", () => {
    const execOutput = `
NAME   MOUNTPOINT
sdb
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual([])
  })

  test("correctly handles irregular formatting", () => {
    const execOutput = `
NAME   MOUNTPOINT
  sdb
├─   sdb1   /media/system_a
├─sdb2       /media/system_b
└─sdb3       /media/user
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual(["sdb1", "sdb2", "sdb3"])
  })

  test("correctly parses partitions when mountpoints are missing", () => {
    const execOutput = `
NAME   MOUNTPOINT
sdb
├─sdb1
├─sdb2
└─sdb3
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual(["sdb1", "sdb2", "sdb3"])
  })

  test('ignores non-partition lines like "NAME" and "MOUNTPOINT"', () => {
    const execOutput = `
NAME   MOUNTPOINT
sdb
├─sdb1 /media/system_a
├─sdb2 /media/system_b
NAME
MOUNTPOINT
└─sdb3 /media/user
`
    const result = LinuxPartitionParser.parsePartitions(execOutput)
    expect(result).toEqual(["sdb1", "sdb2", "sdb3"])
  })
})
