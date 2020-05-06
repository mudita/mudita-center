import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"

test("loads settings", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Get]: Promise.resolve({
      autostart: false,
      tethering: false,
    }),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "autostart": false,
        "tethering": false,
      },
    }
  `)
})

test("updates autostart key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { autostart: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setAutostart(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "autostart": true,
      },
    }
  `)
})

test("updates tethering key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { tethering: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setAutostart(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "tethering": true,
      },
    }
  `)
})
