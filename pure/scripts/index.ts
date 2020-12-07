import { Argv } from "yargs"
import request from "./request"
import requests from "./requests"

require("yargs")
  .command(
    "request <request-config-string>",
    "The command allow you send a single request to the pure device",
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
    "The command allow you make a sending a sequence of requests to the pure device",
    (yargs: Argv) => {
      yargs.option("requestConfigsString", {
        describe: "it's a stringify list of RequestConfig, where definition is in pure/scripts/single-request.ts",
        type: "string",
      })
    },
    requests
  )
  .help().argv
