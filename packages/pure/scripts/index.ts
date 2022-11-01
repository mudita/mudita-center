import { Argv } from "yargs"
import yargs from "yargs"
import request from "./request.js"
import requests from "./requests.js"

// require("yargs")
yargs(process.argv.slice(2)).command(
    "request <request-config-string>",
    "This command allows you to send a single request to the Pure phone",
    (yargs: Argv) => {
      yargs.option("requestConfigString", {
        describe:
          "it's a stringified RequestConfig, where definition is in pure/src/device.types.ts",
        type: "string",
      })
    },
    request
  )
  .command(
    "requests <request-configs-string>",
    "This command allows you to send a sequence of requests to the Pure phone",
    (yargs: Argv) => {
      yargs.option("requestConfigsString", {
        describe:
          "it's a stringified list of RequestConfig, where definition is in pure/src/device.types.ts",
        type: "string",
      })
    },
    requests
  )
  .help().argv
