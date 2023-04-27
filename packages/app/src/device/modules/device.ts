/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import {
  DeviceType,
  DeviceServiceEvent,
  DeviceCommunicationEvent,
  DeviceCommunicationError,
} from "App/device/constants"
import { RequestConfig, DeviceInfo } from "App/device/types/mudita-os"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"

export class Device {
  public connecting = true
  public locked = false
  public agreementAccepted = false
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
    } else if (response.status === RequestResponseStatus.EulaNotAccepted) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceAgreementNotAccepted,
          `Device ${this.path} EULA isn't accepted`,
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

  public async disconnect(): Promise<ResultObject<boolean>> {
    const response = await this.strategy.disconnect()

    this.unmountDeviceListeners()

    if (response) {
      return Result.success(true)
    } else {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DisconnectionFailed,
          `Cannot disconnect device ${this.path}`
        )
      )
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
    } else if (response.status === RequestResponseStatus.EulaNotAccepted) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceAgreementNotAccepted,
          `Device ${this.path} EULA isn't accepted`,
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
    this.on(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    this.on(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    this.on(
      DeviceServiceEvent.DeviceInitializationFailed,
      this.emitDeviceInitializationFailedEvent
    )
    this.on(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    this.on(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.on(
      DeviceServiceEvent.DeviceAgreementAccepted,
      this.emitAgreementAcceptedEvent
    )
    this.on(
      DeviceServiceEvent.DeviceAgreementNotAccepted,
      this.emitAgreementNotAcceptedEvent
    )
  }

  private unmountDeviceListeners(): void {
    this.off(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    this.off(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    this.off(
      DeviceServiceEvent.DeviceInitializationFailed,
      this.emitDeviceInitializationFailedEvent
    )
    this.off(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    this.off(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.off(
      DeviceServiceEvent.DeviceAgreementAccepted,
      this.emitAgreementAcceptedEvent
    )
    this.off(
      DeviceServiceEvent.DeviceAgreementNotAccepted,
      this.emitAgreementNotAcceptedEvent
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
    if (!this.connecting) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected, this.path)
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceDisconnected, this.path)
      this.unmountDeviceListeners()
    }
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
    if (!this.locked) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceLocked, this)
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceLocked, this)
      this.locked = true
    }
  }

  private emitUnlockedEvent = (): void => {
    this.eventEmitter.emit(DeviceServiceEvent.DeviceUnlocked, this)
    this.ipc.sendToRenderers(DeviceIpcEvent.DeviceUnlocked, this)
    this.locked = false
  }

  private emitAgreementAcceptedEvent = (): void => {
    if (!this.locked) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceAgreementAccepted, true)
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceAgreementStatus, true)
      this.agreementAccepted = true
    }
  }

  private emitAgreementNotAcceptedEvent = (): void => {
    if (this.locked) {
      this.eventEmitter.emit(
        DeviceServiceEvent.DeviceAgreementNotAccepted,
        false
      )
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceAgreementStatus, false)
      this.agreementAccepted = false
    }
  }
}
