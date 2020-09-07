const axios = require("axios")
const fs = require("fs-extra")
require("dotenv").config()
;(async () => {
  try {
    const { data: locales } = await axios.get(
      `https://api.phrase.com/v2/projects/${process.env.PHRASE_PROJECT_ID}/locales/`,
      {
        headers: {
          Authorization: `token ${process.env.PHRASE_API_KEY}`,
        },
      }
    )

    for (const locale of locales) {
      const { id, code } = locale

      const { data } = await axios.get(
        `https://api.phrase.com/v2/projects/${process.env.PHRASE_PROJECT_ID}/locales/${id}/download`,
        {
          headers: {
            Authorization: `token ${process.env.PHRASE_API_KEY}`,
          },
          params: { file_format: "react_simple_json" },
        }
      )

      if (Object.keys(data).length) {
        await fs.writeJson(`./src/renderer/locales/default/${code}.json`, data)
      }
    }
  } catch (error) {
    console.log(error)
  }
})()
