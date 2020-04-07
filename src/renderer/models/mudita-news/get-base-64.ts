import axios from "axios"

export const getBase64 = async (url?: string) => {
  try {
    return await axios
      .get(url, {
        responseType: "arraybuffer",
        proxy: {
          host: "localhost",
          port: 2003,
        },
      })
      .then(response => Buffer.from(response.data, "binary").toString("base64"))
  } catch (e) {
    console.log(e)
  }
}
