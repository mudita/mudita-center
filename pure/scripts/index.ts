import { Argv } from "yargs"
import request from "./request"

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
  .help().argv
