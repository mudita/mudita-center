import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

test("loads settings", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Get]: Promise.resolve({
      [Option.Autostart]: false,
      [Option.Tethering]: false,
      [Option.IncomingCalls]: false,
      [Option.IncomingMessages]: false,
      [Option.LowBattery]: false,
    }),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": false,
        "appIncomingCalls": false,
        "appIncomingMessages": false,
        "appLowBattery": false,
        "appTethering": false,
      },
    }
  `)
})

test("updates appAutostart key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.Autostart]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setAutostart(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": true,
      },
    }
  `)
})

test("updates appTethering key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.Tethering]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setTethering(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appTethering": true,
      },
    }
  `)
})

test("updates incomingCalls key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.IncomingCalls]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setIncomingCalls(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingCalls": true,
      },
    }
  `)
})

test("updates appIncomingMessages key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.IncomingMessages]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setIncomingMessages(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingMessages": true,
      },
    }
  `)
})

test("updates appLowBattery key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.LowBattery]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setLowBattery(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLowBattery": true,
      },
    }
  `)
})
