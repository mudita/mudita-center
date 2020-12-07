import { Argv } from "yargs"
import request from "./request"
import requests from "./requests"

require("yargs")
  .command(
    "request <request-config-string>",
    "",
    (yargs: Argv) => {
      yargs.option("requestConfigString", {
        describe: "",
        type: "string",
      })
    },
    request
  )
  .command(
    "requests <request-configs-string>",
    "",
    (yargs: Argv) => {
      yargs.option("requestConfigsString", {
        describe: "",
        type: "string",
      })
    },
    requests
  )
  .help().argv
