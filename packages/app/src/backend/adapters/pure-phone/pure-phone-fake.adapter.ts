/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusDataState,
  GetRestoreDeviceStatusResponseBody,
  MuditaDevice,
  StartBackupResponseBody,
} from "@mudita/pure"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"

export class PurePhoneFakeAdapter extends PurePhoneAdapter {
  public async disconnectDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async connectDevice(): Promise<DeviceResponse<MuditaDevice>> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async unlockDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async getUnlockDeviceStatus(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async getDeviceLockTime(): Promise<
    DeviceResponse<GetPhoneLockTimeResponseBody>
  > {
    return {
      status: DeviceResponseStatus.Ok,
      data: { phoneLockTime: 1630703219 },
    }
  }

  public async getDeviceLogFiles(): Promise<DeviceResponse<DeviceFile[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  public async getDeviceCrashDumpFiles(): Promise<DeviceResponse<string[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  public async downloadDeviceCrashDumpFiles(): Promise<
    DeviceResponse<string[]>
  > {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  public async updateOs(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async startBackupDevice(): Promise<
    DeviceResponse<StartBackupResponseBody>
  > {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
      },
    }
  }

  public async getBackupDeviceStatus(): Promise<
    DeviceResponse<GetBackupDeviceStatusResponseBody>
  > {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
        state: GetBackupDeviceStatusDataState.Finished,
      },
    }
  }

  public async startRestoreDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async getRestoreDeviceStatus(): Promise<
    DeviceResponse<GetRestoreDeviceStatusResponseBody>
  > {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
        state: GetRestoreDeviceStatusDataState.Finished,
      },
    }
  }
}

const createFakePurePhoneAdapter = (): PurePhoneAdapter =>
  new PurePhoneFakeAdapter()

export default createFakePurePhoneAdapter
