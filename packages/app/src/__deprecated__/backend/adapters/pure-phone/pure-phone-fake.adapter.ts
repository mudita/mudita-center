/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import {
  GetBackupDeviceStatusResponseBody,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  StartBackupResponseBody,
} from "App/device/types/mudita-os"
import { RestoreState, BackupState } from "App/device/constants"
import { Device } from "App/device/modules/device"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class PurePhoneFakeAdapter extends PurePhoneAdapter {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async disconnectDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async connectDevice(): Promise<RequestResponse<Device>> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async unlockDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getUnlockDeviceStatus(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getDeviceLockTime(): Promise<
    RequestResponse<GetPhoneLockTimeResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: { phoneLockTime: 1630703219 },
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getDeviceLogFiles(): Promise<RequestResponse<DeviceFile[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getBackupDeviceStatus(): Promise<
    RequestResponse<GetBackupDeviceStatusResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
        state: BackupState.Finished,
      },
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async startRestoreDevice(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getRestoreDeviceStatus(): Promise<
    RequestResponse<GetRestoreDeviceStatusResponseBody>
  > {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        id: `<YYYY-MM-DD>T<HHMMSS>Z`,
        state: RestoreState.Finished,
      },
    }
  }
}

const createFakePurePhoneAdapter = (): PurePhoneAdapter =>
  new PurePhoneFakeAdapter()

export default createFakePurePhoneAdapter
