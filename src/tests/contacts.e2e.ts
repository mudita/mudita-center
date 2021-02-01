import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"
import { ContactEditTestIdsEnum } from "App/contacts/components/contact-edit/contact-edit-test-ids.enum"

let app: any
const shortNumber = "1234"
const incorrectNumber = "mudita"
const incorrectEmail = "mudita.com"

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
})

test("modal opens new window", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.ManageButton}]`)
    .click()
  await app.client
    .$(`*[data-testid=${SyncContactsModalTestIds.GoogleButton}]`)
    .click()
  expect(await app.client.waitUntilWindowLoaded().getWindowCount()).toEqual(2)
})

test("user can open the new contact sidebar", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
})

test("user is unable to save empty contact", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
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

test("user can see correct error when a user enters an incorrect email format", async () => {
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.NewButton}]`)
    .click()
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.Email}]`)
    .setValue(incorrectEmail)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.PrimaryNumber}]`)
    .click()
  expect(await app.client.isExisting(`//*[text()="Email is invalid"]`)).toBe(
    true
  )
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
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
  await app.client
    .$(`*[data-testid=${ContactEditTestIdsEnum.FirstName}]`)
    .setValue("aMudita")
  await app.client.$(`//*[text()="Add to favorites"]`).click()
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.SaveButton}]`)
    .click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid='icon-More']`).isVisible()
  )
  expect(await app.client.isVisible(`//*[text()="aMudita"]`)).toBe(true)
})
