/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { enablepureSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"
import { ContactEditTestIdsEnum } from "App/contacts/components/contact-edit/contact-edit-test-ids.enum"
import { TableTestIds } from "Renderer/components/core/table/table.enum"
import { Application } from "spectron"

let app: Application
const shortNumber = "1234"
const incorrectNumber = "mudita"
const firstName = "Mudita"
const secondName = "Center"
const primaryNumber = "123456"
const secondaryNumber = "654321"
const firstAddressLine = "mudita"
const secondAddressLine = "center"

beforeEach(async () => {
  app = await startApp(true)
  await enablepureSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).isVisible()
  )
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu takes user to correct page", async () => {
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.contacts}`)
})

test("contact details are evoked when a user clicks on any contact", async () => {
  await app.client.$(`*[data-testid='contact-row']`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
})

test("modal opens new window", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.ImportButton}]`)
    .click()
  await app.client
    .$(`*[data-testid=${SyncContactsModalTestIds.GoogleButton}]`)
    .click()
  await app.client.waitUntilWindowLoaded()
  expect(await app.client.getWindowCount()).toEqual(2)
})

test("user can open the new contact sidebar", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
})

test("user is unable to save empty contact", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(false)
})

test("user can see correct error when a user enters a short primary phone number", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .setValue(shortNumber)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondaryNumber}]`)
    .click()
  expect(
    await app.client.isExisting(
      `//*[text()="Must be longer than 5 characters"]`
    )
  ).toBe(true)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(false)
})

test("user can see correct error when a user enters a short secondary phone number", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondaryNumber}]`)
    .setValue(shortNumber)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .click()
  expect(
    await app.client.isExisting(
      `//*[text()="Must be longer than 5 characters"]`
    )
  ).toBe(true)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(false)
})

test("user can see correct error when a user enters a primary number that does not contain only numbers, spaces, + sign", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .setValue(incorrectNumber)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondaryNumber}]`)
    .click()
  expect(
    await app.client.isExisting(
      `//*[text()="May contain only numbers, spaces and + sign"]`
    )
  ).toBe(true)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(false)
})

test("user can see correct error when a user enters a secondary number that does not contain only numbers, spaces, + sign", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondaryNumber}]`)
    .setValue(incorrectNumber)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .click()
  expect(
    await app.client.isExisting(
      `//*[text()="May contain only numbers, spaces and + sign"]`
    )
  ).toBe(true)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(false)
})

test("user can see add a new favorite contact", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.FirstName}]`)
    .setValue(firstName)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondName}]`)
    .setValue(secondName)
  await app.client.$(`//*[text()="Add to favorites"]`).click()
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
    .click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid='icon-More']`).isVisible()
  )
  expect(
    await app.client.isVisible(`//*[text()="${firstName} ${secondName}"]`)
  ).toBe(true)
  await app.client.$(`//*[text()="${firstName} ${secondName}"]`).click()
})

test("user can save the contact after providing a First Name", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.FirstName}]`)
    .setValue(firstName)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("user can save the contact after providing a Second Name", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondName}]`)
    .setValue(secondName)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("user can save the contact after providing a Primary Number", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .setValue(primaryNumber)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("user can save the contact after providing a Secondary Number", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondaryNumber}]`)
    .setValue(secondaryNumber)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("user can save the contact after providing a First Address Line ", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.FirstAddressLine}]`)
    .setValue(firstAddressLine)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("user can save the contact after providing a Second Address Line", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${TableTestIds.Sidebar}]`)
  ).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.SecondAddressLine}]`)
    .setValue(secondAddressLine)
  expect(
    await app.client
      .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
      .isEnabled()
  ).toBe(true)
})

test("outlook button opens new window", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.ImportButton}]`)
    .click()
  await app.client
    .$(`*[data-testid=${SyncContactsModalTestIds.OutlookButton}]`)
    .click()
  await app.client.waitUntilWindowLoaded()
  expect(await app.client.getWindowCount()).toEqual(2)
})
