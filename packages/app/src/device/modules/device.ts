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

// DEPRECATED
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

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
    this.emitConnectionEvent = this.emitConnectionEvent.bind(this)
    this.emitDisconnectionEvent = this.emitDisconnectionEvent.bind(this)
    this.emitLockedEvent = this.emitLockedEvent.bind(this)
    this.emitUnlockedEvent = this.emitUnlockedEvent.bind(this)
    this.emitAgreementAcceptedEvent = this.emitAgreementAcceptedEvent.bind(this)
    this.emitAgreementNotAcceptedEvent =
      this.emitAgreementNotAcceptedEvent.bind(this)

    this.mountDeviceListeners()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async connect(): Promise<ResultObject<DeviceInfo>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    } else if (response.status === RequestResponseStatus.NotAcceptable) {
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: RequestConfig<any>
  ): Promise<ResultObject<ResponseType>> {
    const response = (await this.strategy.request(config)) as RequestResponse<
      ResponseType,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >

    if (response.status === RequestResponseStatus.PhoneLocked) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceLocked,
          `Device ${this.path} is locked`,
          response
        )
      )
    } else if (response.status === RequestResponseStatus.NotAcceptable) {
      return Result.failed(
        new AppError(
          DeviceCommunicationError.DeviceAgreementNotAccepted,
          `Device ${this.path} EULA isn't accepted`,
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

  private mountDeviceListeners(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.on(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.on(
      DeviceServiceEvent.DeviceAgreementAccepted,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.emitAgreementAcceptedEvent
    )
    this.on(
      DeviceServiceEvent.DeviceAgreementNotAccepted,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.emitAgreementNotAcceptedEvent
    )
  }

  private unmountDeviceListeners(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(DeviceServiceEvent.DeviceConnected, this.emitConnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(DeviceServiceEvent.DeviceDisconnected, this.emitDisconnectionEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(DeviceServiceEvent.DeviceLocked, this.emitLockedEvent)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.off(DeviceServiceEvent.DeviceUnlocked, this.emitUnlockedEvent)
    this.off(
      DeviceServiceEvent.DeviceAgreementAccepted,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.emitAgreementAcceptedEvent
    )
    this.off(
      DeviceServiceEvent.DeviceAgreementNotAccepted,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.emitAgreementNotAcceptedEvent
    )
  }

  private emitConnectionEvent(): void {
    if (this.connecting) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceConnected, this)
      this.ipc.sendToRenderers(IpcEmitter.DeviceConnected, {
        deviceType: this.deviceType,
      })
      this.connecting = false
    }
  }

  private emitDisconnectionEvent(): void {
    if (!this.connecting) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected, this.path)
      this.ipc.sendToRenderers(IpcEmitter.DeviceDisconnected, this.path)
      this.unmountDeviceListeners()
    }
  }

  private emitLockedEvent(): void {
    if (!this.locked) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceLocked, this)
      this.ipc.sendToRenderers(IpcEmitter.DeviceLocked, this)
      this.locked = true
    }
  }

  private emitUnlockedEvent(): void {
    this.eventEmitter.emit(DeviceServiceEvent.DeviceUnlocked, this)
    this.ipc.sendToRenderers(IpcEmitter.DeviceUnlocked, this)
    this.locked = false
  }

  private emitAgreementAcceptedEvent(): void {
    if (!this.locked) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceAgreementAccepted, true)
      this.ipc.sendToRenderers(IpcEmitter.DeviceAgreementStatus, true)
      this.agreementAccepted = true
    }
  }

  private emitAgreementNotAcceptedEvent(): void {
    if (this.locked) {
      this.eventEmitter.emit(
        DeviceServiceEvent.DeviceAgreementNotAccepted,
        false
      )
      this.ipc.sendToRenderers(IpcEmitter.DeviceAgreementStatus, false)
      this.agreementAccepted = false
    }
  }
}
