import { E2EMockClient } from "../../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../../libs/e2e-mock/responses/src"
import HomePage from "../../page-objects/home.page"
import drawerPage from "../../page-objects/drawer.page"
import _ from "lodash"
import { KompaktWithMetadata } from "../../interfaces/kompakt-with-metadata"

describe("Kompakt switching devices", () => {
  const kompaktMetadata: KompaktWithMetadata[] = [
    {
      serialNumber: "KOM1234567891",
      network: "T-Mobile",
      batteryLevel: "100%",
    },
    {
      serialNumber: "KOM1234567892",
      network: "Play",
      batteryLevel: "40%",
    },
    {
      serialNumber: "KOM1234567893",
      network: "Orange",
      batteryLevel: "60%",
    },
    {
      serialNumber: "KOM1234567894",
      network: "O2",
      batteryLevel: "80%",
    },
    {
      serialNumber: "KOM1234567895",
      network: "Vodafone",
      batteryLevel: "100%",
    },
    {
      serialNumber: "KOM1234567896",
      network: "Telia",
      batteryLevel: "20%",
    },
  ]

  const kompakts: (typeof overviewDataWithOneSimCard)[] = []

  for (let i = 0; i < 6; i++) {
    kompakts[i] = _.cloneDeep(overviewDataWithOneSimCard)
    kompakts[i].summary.about.serialNumber.text =
      kompaktMetadata[i].serialNumber
    kompakts[i].sections["airplane-mode"].text = kompaktMetadata[i].network
    kompakts[i].sections.battery.text = kompaktMetadata[i].batteryLevel
  }

  before(async () => {
    E2EMockClient.connect()
    await browser.waitUntil(() => {
      return E2EMockClient.checkConnection()
    })
  })

  function generateDevice(no: number) {
    const path = `path-${no + 1}`
    const device = {
      path: path,
      body: kompakts[no],
      serialNumber: kompakts[no].summary.about.serialNumber.text,
    }
    return device
  }

  it("Connect devices", async () => {
    let devices = []

    for (let i = 0; i < 6; i++) {
      devices.push(generateDevice(i))
    }

    for (const device of devices) {
      E2EMockClient.mockResponse({
        path: device.path,
        body: device.body,
        endpoint: "FEATURE_DATA",
        method: "GET",
        status: 200,
      })
      E2EMockClient.addDevice({
        path: device.path,
        serialNumber: device.serialNumber,
      })

      await browser.pause(6000)
    }
  })

  for (let i = 0; i < 6; i++) {
    it("Check Drawer", async () => {
      const deviceSelectDrawer = await drawerPage.deviceSelectDrawer
      await expect(deviceSelectDrawer).toBeDisplayed()

      const deviceOnDrawer = await drawerPage.getDeviceOnDrawer(
        kompakts[i].summary.about.serialNumber.text
      )

      const deviceImageOnDrawer = deviceOnDrawer.$(
        '[data-testid="drawer-device-image"]'
      )
      const deviceTypeOnDrawer = deviceOnDrawer.$(
        '[data-testid="drawer-device-type"]'
      )

      const deviceSNOnDrawer = deviceOnDrawer.$(
        '[data-testid="drawer-device-serial-number-value"]'
      )

      const di = await deviceImageOnDrawer.getAttribute("src")
      const dt = await deviceTypeOnDrawer.getText()
      const sn = await deviceSNOnDrawer.getText()
      console.log(i, dt, sn)

      await expect(deviceSNOnDrawer).toHaveText(
        kompakts[i].summary.about.serialNumber.text
      )
    })
  }

  it("Disconnect the devices and check if Welcome Page is present", async () => {
    E2EMockClient.removeDevice("path-1")
    E2EMockClient.removeDevice("path-2")
    E2EMockClient.removeDevice("path-3")
    E2EMockClient.removeDevice("path-4")
    E2EMockClient.removeDevice("path-5")
    E2EMockClient.removeDevice("path-6")

    const homeHeader = await HomePage.homeHeader
    await homeHeader.waitForDisplayed()
  })

  after(() => {
    E2EMockClient.stopServer()
    E2EMockClient.disconnect()
  })
})
