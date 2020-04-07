import axios from "axios"

export const getBase64 = async (url?: string) => {
  try {
    return await axios
      .get("https:" + url, {
        responseType: "arraybuffer",
      })
      .then(
        response =>
          "data:image;base64," +
          Buffer.from(response.data, "binary").toString("base64")
      )
  } catch (e) {
    console.log(e)
  }
}
