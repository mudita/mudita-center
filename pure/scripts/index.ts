import { Argv } from "yargs"
import request from "./request"
import requests from "./requests"

require("yargs")
  .command(
    "request <request-config-string>",
    "This command allows you to send a single request to the Pure phone",
    (yargs: Argv) => {
      yargs.option("requestConfigString", {
        describe: "it's a stringify RequestConfig, where definition is in pure/scripts/single-request.ts",
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
        describe: "it's a stringify list of RequestConfig, where definition is in pure/scripts/single-request.ts",
        type: "string",
      })
    },
    requests
  )
  .help().argv
