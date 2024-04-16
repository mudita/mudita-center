/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { Response } from "Core/device/types/mudita-os"
import { RequestResponse, RequestResponseStatus } from "Core/core/types"
import { BodyKompakt } from "Core/device/types/kompakt/body-kompakt.type"
import { SIM, Tray } from "Core/device/constants"

export class ResponseKompaktPresenter {
  static toResponseObject(
    response: ResultObject<Response<BodyKompakt>>
  ): RequestResponse {
    const data = response.data as Response<BodyKompakt>
    const simCard = data.body?.simCards[0]

    return {
      status: response.ok
        ? RequestResponseStatus.Ok
        : RequestResponseStatus.Error,
      data: {
        //from device
        serialNumber: data.body?.serialNumber,
        batteryLevel: data.body?.batteryCapacity,
        batteryState: data.body?.batteryState,
        version: data.body?.version,
        signalStrength: simCard?.signalStrength,
        networkOperatorName: simCard?.networkOperatorName,
        networkStatus: simCard?.networkStatus,

        //mocked
        accessTechnology: "255",
        backupFilePath: "/user/temp/backup.tar",
        caseColour: "black",
        currentRTCTime: "1686307333",
        deviceSpaceTotal: "14951",
        deviceToken: "RIQLcvFFgl8ibFcHwBO3Ev0YTa2vxfbI",
        gitBranch: "HEAD",
        gitRevision: "4cd97006",
        mtpPath: "/user/media/app/music_player",
        selectedSim: SIM.None,
        recoveryStatusFilePath: "/user/temp/recovery_status.json",
        syncFilePath: "/user/temp/sync.tar",
        systemReservedSpace: "2048",
        trayState: Tray.Out,
        updateFilePath: "/user/temp/update.tar",
        usedUserSpace: "438",
      },
    }
  }
}
