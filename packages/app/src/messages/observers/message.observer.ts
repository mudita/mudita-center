/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/__deprecated__/backend/device-service"
import { MainProcessIpc } from "electron-better-ipc"
import { IpcEvent } from "App/data-sync/constants"
import { MessageService, ThreadService } from "App/messages/services"
import { MessageRepository, ThreadRepository } from "App/messages/repositories"
import { isResponseSuccessWithData } from "App/core/helpers"

export const watchTime = 10000

export class MessageObserver implements Observer {
  private invoked = false
  private disconnected = true
  private _previousMessagesString = ""
  private _previousThreadsString = ""

  constructor(
    private ipc: MainProcessIpc,
    private deviceService: DeviceService,
    private messageService: MessageService,
    private threadService: ThreadService,
    private messageRepository: MessageRepository,
    private threadRepository: ThreadRepository
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.deviceService.on(DeviceServiceEventName.DeviceUnlocked, async () => {
      this.disconnected = false

      if (this.invoked) {
        return
      }

      this.invoked = true

      await this.watchMessageEntries()
    })

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      async () => {
        this.invoked = false
        this.disconnected = true
      }
    )
  }

  private async watchMessageEntries(): Promise<void> {
    if (this.disconnected) {
      return
    }

    const threadSuccess = await this.readThreads()
    const messageSuccess = await this.readMessages()

    if (messageSuccess || threadSuccess) {
      this.ipc.sendToRenderers(IpcEvent.DataUpdated)
    }

    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await this.watchMessageEntries())
      }, watchTime)
    })
  }

  private async readMessages(): Promise<boolean> {
    const response = await this.messageService.getMessages({
      limit: 4,
      offset: 0,
    })

    if (isResponseSuccessWithData(response)) {
      const messages = response.data.data
      const stringifyMessages = JSON.stringify(messages)

      if (stringifyMessages === this.previousMessagesString) {
        return false
      }

      this.previousMessagesString = stringifyMessages
      messages.forEach((message) => this.messageRepository.create(message))
      return true
    } else {
      return false
    }
  }

  private async readThreads(): Promise<boolean> {
    const response = await this.threadService.getThreads({
      limit: 4,
      offset: 0,
    })

    if (isResponseSuccessWithData(response)) {
      const threads = response.data.data
      const threadsString = JSON.stringify(threads)

      if (threadsString === this.previousThreadsString) {
        return false
      }

      this.previousThreadsString = threadsString

      response.data.data.forEach((message) =>
        this.threadRepository.create(message)
      )
      return true
    } else {
      return false
    }
  }

  private get previousMessagesString(): string {
    return this._previousMessagesString
  }

  private set previousMessagesString(value: string) {
    this._previousMessagesString = value
  }

  private get previousThreadsString(): string {
    return this._previousThreadsString
  }

  private set previousThreadsString(value: string) {
    this._previousThreadsString = value
  }
}
