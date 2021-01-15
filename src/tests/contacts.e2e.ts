import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { SyncContactsModalTestIds } from "Renderer/components/rest/sync-modals/sync-contacts-modal-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.contacts}`)
})

test("contact details are evoked when a user clicks on any contact", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
  await app.client.$(`*[data-testid='contact-row']`).click()
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
})

test("modal opens new window", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
  await app.client
    .$(`*[data-testid=${ContactPanelTestIdsEnum.ManageButton}]`)
    .click()
  await app.client
    .$(`*[data-testid=${SyncContactsModalTestIds.GoogleButton}]`)
    .click()
  expect(await app.client.waitUntilWindowLoaded().getWindowCount()).toEqual(2)
})
