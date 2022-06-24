/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusDataState,
  GetRestoreDeviceStatusResponseBody,
  MuditaDevice,
  StartBackupResponseBody,
} from "@mudita/pure"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class PurePhoneFakeAdapter extends PurePhoneAdapter {
  public async disconnectDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async connectDevice(): Promise<RequestResponse<MuditaDevice>> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async unlockDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async getUnlockDeviceStatus(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async getDeviceLockTime(): Promise<
    RequestResponse<GetPhoneLockTimeResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: { phoneLockTime: 1630703219 },
    }
  }

  public async getDeviceLogFiles(): Promise<RequestResponse<DeviceFile[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  public async getDeviceCrashDumpFiles(): Promise<RequestResponse<string[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  public async downloadDeviceCrashDumpFiles(): Promise<
    RequestResponse<string[]>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  public async updateOs(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async startBackupDevice(): Promise<
    RequestResponse<StartBackupResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
      },
    }
  }

  public async getBackupDeviceStatus(): Promise<
    RequestResponse<GetBackupDeviceStatusResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
        state: GetBackupDeviceStatusDataState.Finished,
      },
    }
  }

  public async startRestoreDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async getRestoreDeviceStatus(): Promise<
    RequestResponse<GetRestoreDeviceStatusResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
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
