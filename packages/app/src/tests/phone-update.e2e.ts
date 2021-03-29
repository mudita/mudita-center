/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { Application } from "spectron";
import { name } from "../../package.json"
import fs from "fs"
import { SystemTestIds } from "Renderer/components/rest/overview/system/system-test-ids"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import path from "path"

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
  await enablePhoneSimulation(app)
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
      .$(`*[data-testid=${OverviewTestIds.DownloadingUpdateFinishedModal}]`)
      .isVisible()
  )
  await app.client.$(`*[data-testid=${ModalTestIds.ModalActionButton}]`).click()
  await app.client.waitUntil(() =>
    app.client
      .$(`*[data-testid=${OverviewTestIds.UpdatingSuccessModal}]`)
      .isVisible()
  )
})
