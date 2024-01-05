/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DesktopService } from "Core/desktop/desktop.service"
import sudoPrompt from "@vscode/sudo-prompt"
import childProcess from "child_process"
import EventEmitter from "events"

afterEach(() => {
  jest.resetAllMocks()
})

const desktopService = new DesktopService()

const originalPlatform = process.platform
const originalGetuid = process.getuid

describe("isLinux", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test("os is not linux", async () => {
    Object.defineProperty(process, "platform", {
      value: "win32",
    })

    expect(await desktopService.isLinux()).toEqual(false)
  })
  test("os is linux", async () => {
    Object.defineProperty(process, "platform", {
      value: "linux",
    })

    expect(await desktopService.isLinux()).toEqual(true)
  })

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
    })
  })
})

describe("isSudoMode", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test("application is not run in sudo mode", async () => {
    Object.defineProperty(process, "platform", {
      value: "linux",
    })
    Object.defineProperty(process, "getuid", {
      value: () => 123,
    })

    expect(await desktopService.isSudoMode()).toEqual(false)
  })

  test("application is run in sudo mode", async () => {
    Object.defineProperty(process, "platform", {
      value: "linux",
    })
    Object.defineProperty(process, "getuid", {
      value: () => 0,
    })

    expect(await desktopService.isSudoMode()).toEqual(true)
  })

  test("application is run in sudo mode, because platform is not linux", async () => {
    Object.defineProperty(process, "platform", {
      value: "win32",
    })
    Object.defineProperty(process, "getuid", {
      value: () => 0,
    })

    expect(await desktopService.isSudoMode()).toEqual(false)
  })

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
    })
    Object.defineProperty(process, "getuid", {
      value: originalGetuid,
    })
  })
})

describe("isUserInSerialPortGroup", () => {
  test("user is in serial port group", async () => {
    const getGroupsAssignedToSerialPortSpy = jest
      .spyOn(desktopService, "getGroupsAssignedToSerialPort")
      .mockImplementation(() => new Promise((resolve) => resolve("uucp")))

    const getUserGroupsSpy = jest
      .spyOn(desktopService, "getUserGroups")
      .mockImplementation(() => new Promise((resolve) => resolve("uucp")))

    expect(await desktopService.isUserInSerialPortGroup()).toEqual(true)

    getGroupsAssignedToSerialPortSpy.mockClear()
    getUserGroupsSpy.mockClear()
  })

  test("user is not in serial port group", async () => {
    const getGroupsAssignedToSerialPortSpy = jest
      .spyOn(desktopService, "getGroupsAssignedToSerialPort")
      .mockImplementation(() => new Promise((resolve) => resolve("uucp")))

    const getUserGroupsSpy = jest
      .spyOn(desktopService, "getUserGroups")
      .mockImplementation(() => new Promise((resolve) => resolve("")))

    expect(await desktopService.isUserInSerialPortGroup()).toEqual(false)

    getGroupsAssignedToSerialPortSpy.mockClear()
    getUserGroupsSpy.mockClear()
  })
})

describe("getGroupsAssignedToSerialPort", () => {
  test("getting groups ends with error", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(err, "", "")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      await desktopService.getGroupsAssignedToSerialPort()
    } catch (err) {
      expect(err).toEqual(`error-name - error-message`)
    }

    execSpy.mockClear()
  })

  test("getting groups ends with stderr", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(null, "", "stderr")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      await desktopService.getGroupsAssignedToSerialPort()
    } catch (err) {
      expect(err).toEqual(`stderr`)
    }

    execSpy.mockClear()
  })

  test("getting groups works", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(null, "uucp", "")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      const result = await desktopService.getGroupsAssignedToSerialPort()
      expect(result).toBe("uucp")
      // eslint-disable-next-line no-empty
    } catch (err) {}

    execSpy.mockClear()
  })
})

describe("getUserGroups", () => {
  test("getting user groups ends with error", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(err, "", "")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      await desktopService.getUserGroups()
    } catch (err) {
      expect(err).toEqual(`error-name - error-message`)
    }

    execSpy.mockClear()
  })

  test("getting user groups ends with stderr", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(null, "", "stderr")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      await desktopService.getUserGroups()
    } catch (err) {
      expect(err).toEqual(`stderr`)
    }

    execSpy.mockClear()
  })

  test("getting user groups works", async () => {
    const execSpy = jest
      .spyOn(childProcess, "exec")
      .mockImplementation((command, options, callback) => {
        if (typeof callback === "function") {
          const err = new Error("error-message")
          err.name = "error-name"
          callback(null, "uucp", "")
        }

        return new EventEmitter() as childProcess.ChildProcess
      })

    try {
      const result = await desktopService.getUserGroups()
      expect(result).toBe("uucp")
      // eslint-disable-next-line no-empty
    } catch (err) {}

    execSpy.mockClear()
  })
})

//

describe("addUserToSerialPortGroup", () => {
  test("user not added to serial port group", async () => {
    const execSpy = jest
      .spyOn(sudoPrompt, "exec")
      .mockImplementation((_, callback) => {
        if (typeof callback === "function") {
          callback(new Error("blabla"))
        }
      })

    try {
      await desktopService.addUserToSerialPortGroup()
    } catch (err) {
      expect(err).toBe("Could not add user")
    }

    execSpy.mockClear()
  })

  test("user added to serial port group", async () => {
    const execSpy = jest
      .spyOn(sudoPrompt, "exec")
      .mockImplementation((_, callback) => {
        if (typeof callback === "function") {
          callback(undefined)
        }
      })

    try {
      await desktopService.addUserToSerialPortGroup()
      expect(sudoPrompt.exec).toHaveBeenCalled()
      // eslint-disable-next-line no-empty
    } catch (err) {}

    execSpy.mockClear()
  })
})
