/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs"
import { Application } from "spectron"
import { name } from "../../package.json"
import { enablepureSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { OverviewModalsTestIds } from "App/overview/components/overview-modals-test-ids.enum"

let app: Application

const deleteDownloadDirectory = (downloadPath: string) => {
  if (fs.existsSync(downloadPath)) {
    fs.rmdirSync(downloadPath, { recursive: true })
  }
}

beforeEach(async () => {
  app = await startApp(true)
  const downloadPath = path.join(
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await app.electron.remote.app.getPath("appData"),
    name,
    "pure",
    "os",
    "downloads"
  )
  deleteDownloadDirectory(downloadPath)
  await enablepureSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Overview}]`).isVisible()
  )
})

afterEach(async () => {
  const downloadPath = path.join(
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await app.electron.remote.app.getPath("appData"),
    name,
    "pure",
    "os",
    "downloads"
  )
  deleteDownloadDirectory(downloadPath)
  await stopApp(app)
})

test("success update test", async () => {
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${SystemTestIds.DownloadButton}]`).isVisible()
  )
  await app.client.$(`*[data-testid=${SystemTestIds.DownloadButton}]`).click()
  await app.client.waitUntil(() =>
    app.client
      .$(
        `*[data-testid=${OverviewModalsTestIds.DownloadingUpdateFinishedModal}]`
      )
      .isVisible()
  )
  await app.client.$(`*[data-testid=${ModalTestIds.ModalActionButton}]`).click()
  await app.client.waitUntil(() =>
    app.client
      .$(`*[data-testid=${OverviewModalsTestIds.UpdatingSuccessModal}]`)
      .isVisible()
  )
})
