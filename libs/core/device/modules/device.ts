/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ResultObject, Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import {
  DeviceType,
  DeviceServiceEvent,
  DeviceCommunicationEvent,
  DeviceCommunicationError,
} from "Core/device/constants"
import { RequestConfig, DeviceInfo } from "Core/device/types/mudita-os"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { DeviceIpcEvent } from "Core/device/constants/device-ipc-event.constant"

export interface DeviceProperties {
  path: string
  deviceType: DeviceType
  connecting: boolean
  locked: null | boolean
  onboardingFinished: boolean
  serialNumber: string
}

export const getDevicePropertiesFromDevice = ({
  path,
  deviceType,
  connecting,
  locked,
  onboardingFinished,
  serialNumber,
}: Device): DeviceProperties => {
  return {
    path,
    deviceType,
    connecting,
    locked,
    onboardingFinished,
    serialNumber,
  }
}

export class Device implements DeviceProperties {
  public connecting = true
  public locked: null | boolean = null
  public onboardingFinished = false
  public serialNumber = ""

  constructor(
    public path: string,
    public deviceType: DeviceType,
    private strategy: DeviceStrategy,
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {
    this.mountListeners()
  }

  public toSerializableObject(): DeviceProperties {
    return {
      path: this.path,
      deviceType: this.deviceType,
      connecting: this.connecting,
      locked: this.locked,
      onboardingFinished: this.onboardingFinished,
      serialNumber: this.serialNumber,
    }
  }

  public async connect(): Promise<ResultObject<DeviceInfo>> {
    const response = await this.strategy.connect()

    if (response.data) {
      this.serialNumber = response.data.serialNumber
    }

    if (response.status === RequestResponseStatus.PhoneLocked) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceLocked,
          `Device ${this.path} is locked`,
          response
        )
      )
    } else if (
      response.status === RequestResponseStatus.OnboardingNotFinished
    ) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceOnboardingNotFinished,
          `Device ${this.path} onboarding not finished`,
          response
        )
      )
    } else if (response.status !== RequestResponseStatus.Ok || !response.data) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.RequestFailed,
          `Request to device ${this.path} failed`,
          response
        )
      )
    } else {
      return Result.success(response.data)
    }
  }

  public async request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    const response = (await this.strategy.request(config)) as RequestResponse<
      ResponseType,
      unknown
    >

    if (response.status === RequestResponseStatus.PhoneLocked) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceLocked,
          `Device ${this.path} is locked`,
          response
        )
      )
    } else if (
      response.status === RequestResponseStatus.OnboardingNotFinished
    ) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceOnboardingNotFinished,
          `Device ${this.path} onboarding not finished`,
          response
        )
      )
    } else if (response.status === RequestResponseStatus.BatteryCriticalLevel) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.BatteryCriticalLevel,
          `Device ${this.path} has critical battery level`,
          response
        )
      )
    } else if (response.status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.RequestFailed,
          `Request to device ${this.path} failed`,
          response
        )
      )
    } else {
      return Result.success(response.data as ResponseType)
    }
  }

  public onCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.strategy.onCommunicationEvent(eventName, listener)
  }

  public offCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.strategy.offCommunicationEvent(eventName, listener)
  }

  public on(eventName: DeviceServiceEvent, listener: () => void): void {
    this.strategy.on(eventName, listener)
  }

  public off(eventName: DeviceServiceEvent, listener: () => void): void {
    this.strategy.off(eventName, listener)
  }

  private mountListeners(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    this.on(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(
      DeviceServiceEvent.DeviceInitializationFailed,
      this.emitDeviceInitializationFailedEvent
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    this.on(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.on(
      DeviceServiceEvent.DeviceOnboardingFinished,
      this.emitOnboardingFinishedEvent
    )
    this.on(
      DeviceServiceEvent.DeviceOnboardingNotFinished,
      this.emitOnboardingNotFinishedEvent
    )
  }

  private unmountDeviceListeners(): void {
    this.off(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    this.off(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(
      DeviceServiceEvent.DeviceInitializationFailed,
      this.emitDeviceInitializationFailedEvent
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    this.off(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.off(
      DeviceServiceEvent.DeviceOnboardingFinished,
      this.emitOnboardingFinishedEvent
    )
    this.off(
      DeviceServiceEvent.DeviceOnboardingNotFinished,
      this.emitOnboardingNotFinishedEvent
    )
  }

  private emitConnectionEvent = (): void => {
    if (this.connecting) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceConnected, this)
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceConnected, {
        deviceType: this.deviceType,
      })
      this.connecting = false
    }
  }

  private emitDisconnectionEvent = (): void => {
    this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected, this.path)
    this.ipc.sendToRenderers(DeviceIpcEvent.DeviceDisconnected, this.path)
    this.unmountDeviceListeners()
  }

  private emitDeviceInitializationFailedEvent = (): void => {
    this.eventEmitter.emit(
      DeviceServiceEvent.DeviceInitializationFailed,
      this.path
    )
    this.ipc.sendToRenderers(
      DeviceIpcEvent.DeviceInitializationFailed,
      this.path
    )
    this.unmountDeviceListeners()
  }

  private emitLockedEvent = (): void => {
    if (!this.onboardingFinished) {
      return
    }

    if (this.locked !== true) {
      this.eventEmitter.emit(
        DeviceServiceEvent.DeviceLocked,
        this.toSerializableObject()
      )
      this.ipc.sendToRenderers(
        DeviceIpcEvent.DeviceLocked,
        this.toSerializableObject()
      )
      this.locked = true
    }
  }

  private emitUnlockedEvent = (): void => {
    if (!this.onboardingFinished) {
      return
    }

    if (this.locked !== false) {
      this.eventEmitter.emit(
        DeviceServiceEvent.DeviceUnlocked,
        this.toSerializableObject()
      )
      this.ipc.sendToRenderers(
        DeviceIpcEvent.DeviceUnlocked,
        this.toSerializableObject()
      )
      this.locked = false
    }
  }

  private emitOnboardingFinishedEvent = (): void => {
    if (this.locked !== null) {
      return
    }

    if (!this.onboardingFinished) {
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceOnboardingStatus, true)
      this.onboardingFinished = true
    }
  }

  private emitOnboardingNotFinishedEvent = (): void => {
    if (this.locked !== null) {
      return
    }

    if (this.onboardingFinished) {
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceOnboardingStatus, false)
      this.onboardingFinished = false
    }
  }
}
