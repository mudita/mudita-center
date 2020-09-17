import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.UpdateAppSettings]: Promise.resolve(),
  }
}

test("loads settings", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve(fakeAppSettings),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": false,
        "appConversionFormat": "WAV",
        "appConvert": "Convert automatically",
        "appIncomingCalls": false,
        "appIncomingMessages": false,
        "appLowBattery": false,
        "appNonStandardAudioFilesConversion": false,
        "appOsUpdates": false,
        "appTethering": false,
        "appTray": true,
        "language": "en-US",
        "pureOsBackupLocation": "fake/path/pure/phone/backups/",
        "pureOsDownloadLocation": "fake/path/pure/os/downloads/",
      },
    }
  `)
})

test("updates autostart setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setAutostart(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": true,
      },
    }
  `)
})

test("updates tethering setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setTethering(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appTethering": true,
      },
    }
  `)
})

test("updates incoming calls setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setIncomingCalls(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingCalls": true,
      },
    }
  `)
})

test("updates incoming messages setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setIncomingMessages(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingMessages": true,
      },
    }
  `)
})

test("updates low battery setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setLowBattery(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLowBattery": true,
      },
    }
  `)
})

test("updates os updates setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setOsUpdates(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appOsUpdates": true,
      },
    }
  `)
})

test("updates os audio files conversion setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setNonStandardAudioFilesConversion(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appNonStandardAudioFilesConversion": true,
      },
    }
  `)
})

test("updates convert setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setConvert(Convert.ConvertAutomatically)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appConvert": "Convert automatically",
      },
    }
  `)
})

test("updates conversion format setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setConversionFormat(ConversionFormat.WAV)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appConversionFormat": "WAV",
      },
    }
  `)
})

test("updates tray setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setAppTray(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appTray": true,
      },
    }
  `)
})

test("updates PureOS backup location setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setPureOsBackupLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "pureOsBackupLocation": "some/fake/location",
      },
    }
  `)
})

test("updates PureOS download location setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setPureOsDownloadLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "pureOsDownloadLocation": "some/fake/location",
      },
    }
  `)
})

test("updates language setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setLanguage("de-DE")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "language": "de-DE",
      },
    }
  `)
})
