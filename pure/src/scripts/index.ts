import { Argv } from "yargs"
import PureDeviceManager, { Endpoint, Method } from "../index"

const request = async () => {
  const [device] = await PureDeviceManager.getDevices()
  const { status: connect } = await device.connect()
  console.log("connect: ", connect)
  const request = {
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  }
  console.log("request: ", JSON.stringify(request))
  const response = await device.request(request)
  console.log("response: ", JSON.stringify(response))
  const { status: disconnect } = await device.disconnect()
  console.log("disconnect: ", disconnect)
}

// tslint:disable-next-line:no-unused-expression
require("yargs")
  .command(
    "request",
    "",
    (yargs: Argv) => {
      yargs
        .option("Endpoint", {
          describe: "",
          type: "string",
        })
        .option("Method", {
          describe: "",
          type: "string",
        })
        .option("Payload", {
          describe: "",
          type: "string",
        })
    },
    request
  )
  .help().argv
