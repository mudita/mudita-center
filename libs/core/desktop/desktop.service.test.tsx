/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DesktopService } from "Core/desktop/desktop.service";
import sudoPrompt from "@vscode/sudo-prompt";

import * as childProcess from "child_process";

jest.mock('child_process', () => ({
  exec: jest.fn().mockImplementation((_cmd, _options, callback) => {
    callback(null, "", null);
  }),
}));

jest.mock("@vscode/sudo-prompt", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  exec: jest.fn().mockImplementation((_cmd, _options, callback) => callback(null)),
}));

const desktopService = new DesktopService();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("isLinux", () => {
  test("os is not linux", async () => {
    Object.defineProperty(process, "platform", { value: "win32" });
    expect(await desktopService.isLinux()).toEqual(false);
  });

  test("os is linux", async () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    expect(await desktopService.isLinux()).toEqual(true);
  });
});

describe("hasUserSerialPortAccess", () => {
  test("user is in serial port group", async () => {
    // @ts-ignore
    childProcess.exec.mockImplementationOnce((_, cb) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cb(null, "dialout uucp", null)
    });
    expect(await desktopService.hasUserSerialPortAccess()).toEqual(true);
  });

  test("user is not in serial port group", async () => {
    // @ts-ignore
    childProcess.exec.mockImplementationOnce((_, cb) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cb(null, "", null)
    });
    expect(await desktopService.hasUserSerialPortAccess()).toEqual(false);
  });
});

describe("addUserToSerialPortGroup", () => {
  test("user not in any serial port group and added to dialout", async () => {
    // @ts-ignore
    childProcess.exec.mockImplementationOnce((_, cb) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cb(null, "", null)
    });
    await desktopService.addUserToSerialPortGroup();
    expect(sudoPrompt.exec).toHaveBeenCalledWith(expect.stringContaining("usermod -aG dialout $USER"), expect.anything(), expect.any(Function));
  });
});
