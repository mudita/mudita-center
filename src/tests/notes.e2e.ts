/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import { URL_MAIN } from "Renderer/constants/urls"

let app: any
const testText = "essa"

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Tools}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test.skip("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tools}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.tools}`)
})

test.skip("clicking a new note button evokes new note sidebar", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tools}]`).click()
  expect(
    await app.client.isVisible(`*[data-testid=${NotesTestIds.NewNoteSidebar}]`)
  ).toBe(false)
  await app.client.$(`*[data-testid=${NotesTestIds.NewNoteButton}]`).click()
  expect(
    await app.client.isVisible(`*[data-testid=${NotesTestIds.NewNoteSidebar}]`)
  ).toBe(true)
})

test.skip("user can type a note on a new note sidebar's textarea", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tools}]`).click()
  await app.client.$(`*[data-testid=${NotesTestIds.NewNoteButton}]`).click()
  await app.client.$(`textarea`).click()
  await app.client.$(`textarea`).setValue(testText)
  expect(await app.client.$("textarea").getValue()).toBe(testText)
})

test.skip("user can save the notes", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tools}]`).click()
  const notesCountBefore = await app.client.elements(
    `*[data-testid=${NotesTestIds.Note}]`
  )
  await app.client.$(`*[data-testid=${NotesTestIds.NewNoteButton}]`).click()
  await app.client.$(`textarea`).click()
  await app.client.$(`textarea`).setValue(testText)
  await app.client.$(`*[data-testid="save"`).click()
  expect(
    await app.client.$(`*[data-testid=${NotesTestIds.Note}]`).getText()
  ).toBe(testText)
  const notesCountAfter = await app.client.elements(
    `*[data-testid=${NotesTestIds.Note}]`
  )
  expect(notesCountAfter.value.length).toBe(notesCountBefore.value.length + 1)
})
