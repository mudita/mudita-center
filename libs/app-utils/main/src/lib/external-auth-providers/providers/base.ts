/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { EventEmitter } from "events"
import {
  ExternalAuthProvidersAuthorizationData,
  ExternalAuthProvidersScope,
} from "app-utils/models"
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions

export enum Events {
  AuthSuccess = "authSuccess",
  AuthError = "authError",
}

export class BaseProvider<Contact = unknown, CalendarEvent = unknown> {
  eventEmitter = new EventEmitter()
  authData: ExternalAuthProvidersAuthorizationData | undefined
  window: BrowserWindow | undefined
  windowConfig: BrowserWindowConstructorOptions = {
    title: "Authentication",
    width: 520,
    height: 680,
    show: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    useContentSize: true,
    autoHideMenuBar: process.env.NODE_ENV !== "development",
    titleBarStyle: "default",
    titleBarOverlay: {
      color: "#FFFFFF",
      symbolColor: "#000000",
      height: 32,
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  }

  authenticate(_scopes: ExternalAuthProvidersScope[]): Promise<void> {
    throw new Error("Method `authenticate` not implemented.")
  }

  getAuthorizationData() {
    return new Promise<ExternalAuthProvidersAuthorizationData | undefined>(
      (resolve) => {
        this.eventEmitter.once(Events.AuthSuccess, () => resolve(this.authData))
        this.eventEmitter.once(Events.AuthError, () => resolve(undefined))
      }
    )
  }

  reset(): void {
    this.eventEmitter.removeAllListeners()
    this.window?.close()
    this.window = undefined
    this.authData = undefined
  }

  getData(
    scope: ExternalAuthProvidersScope.Contacts,
    onStartImporting?: VoidFunction
  ): Promise<Contact[]>
  getData(
    scope: ExternalAuthProvidersScope.Calendar,
    onStartImporting?: VoidFunction
  ): Promise<CalendarEvent[]>
  getData(
    scope: ExternalAuthProvidersScope,
    onStartImporting?: VoidFunction
  ): Promise<Contact[] | CalendarEvent[]>
  async getData(
    scope: ExternalAuthProvidersScope,
    onStartImporting?: VoidFunction
  ): Promise<Contact[] | CalendarEvent[]> {
    await new Promise<void>((resolve, reject) => {
      this.eventEmitter.once(Events.AuthSuccess, () => resolve())
      this.eventEmitter.once(Events.AuthError, () => reject())
    })
    onStartImporting?.()
    switch (scope) {
      case ExternalAuthProvidersScope.Contacts:
        return this.getContactsData()
      case ExternalAuthProvidersScope.Calendar:
        return this.getCalendarData()
    }
  }

  getContactsData(): Promise<Contact[]> {
    throw new Error("Method `getContactsData` not implemented.")
  }

  getCalendarData(): Promise<CalendarEvent[]> {
    throw new Error("Method `getCalendarData` not implemented.")
  }

  async openAuthWindow(url: string) {
    this.window = new BrowserWindow(this.windowConfig)

    this.window.on("closed", () => {
      this.eventEmitter.emit(Events.AuthError)
      this.window = undefined
    })

    await this.window.loadURL(url)

    const mainWindowBounds = BrowserWindow.getAllWindows()
      .find((w) => w.id === 1)
      ?.getBounds()

    if (mainWindowBounds) {
      const {
        width: mainWidth,
        height: mainHeight,
        x: mainX,
        y: mainY,
      } = mainWindowBounds
      const { width: windowWidth = 520, height: windowHeight = 680 } =
        this.windowConfig

      const x = Math.round(mainX + (mainWidth - windowWidth) / 2)
      const y = Math.round(mainY + (mainHeight - windowHeight) / 2)

      this.window.setBounds({
        width: windowWidth,
        height: windowHeight,
        x,
        y,
      })
    }

    this.window.show()
  }
}
