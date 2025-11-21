/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mapToCoreUsbId } from "./map-to-core-usb-id"

describe("mapToCoreUsbId", () => {
  it("should correctly map 'mi_' and filter it out of the device ID", () => {
    const input =
      "usb#vid_3310&pid_200a&mi_00#7&c16b493&0&0002#{6ac27878-a6fa-4155-ba85-f98f491d4f33}"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_3310&PID_200A\\7&C16B493&0"
    expect(result).toEqual(expected)
  })
  it("should correctly map 'mi_' and filter it out of the device ID vol.2", () => {
    const input = "USB\\VID_3310&PID_200A&MI_00\\7&C16B493&0&0002"
    const result = mapToCoreUsbId(input, "\\")

    const expected = "USB\\VID_3310&PID_200A\\7&C16B493&0"
    expect(result).toEqual(expected)
  })

  it("should return the input string when 'vid_' and 'pid_' are not present", () => {
    const input = "device_123"
    const result = mapToCoreUsbId(input)

    expect(result).toEqual(input)
  })

  it("should correctly format device ID with 'vid_' and 'pid_' parts", () => {
    const input = "usb#vid_1234&pid_5678"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_1234&PID_5678"
    expect(result).toEqual(expected)
  })

  it("should correctly format device ID and instance ID", () => {
    const input = "usb#vid_1234&pid_5678#1&ABCD&2"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_1234&PID_5678\\1&ABCD&2"
    expect(result).toEqual(expected)
  })

  it("should handle missing instance ID parts", () => {
    const input = "usb#vid_1234&pid_5678#1&ABCD"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_1234&PID_5678\\1&ABCD"
    expect(result).toEqual(expected)
  })

  it("should return formatted result even if instance ID is empty", () => {
    const input = "usb#vid_1234&pid_5678#"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_1234&PID_5678"
    expect(result).toEqual(expected)
  })

  it("should correctly format instance ID when present", () => {
    const input = "usb#vid_1234&pid_5678#1&ABCD&2"
    const result = mapToCoreUsbId(input)

    const expected = "USB\\VID_1234&PID_5678\\1&ABCD&2"
    expect(result).toEqual(expected)
  })

  it("should handle empty input", () => {
    const input = ""
    const result = mapToCoreUsbId(input)

    expect(result).toEqual("")
  })
})
