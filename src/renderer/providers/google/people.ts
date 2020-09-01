import axios from "axios"

export const getPeople = async (
  auth: any /** Google doesnt export type for this */
) => {
  console.log(auth)
  const d = await axios("https://people.googleapis.com/v1/contactGroups", {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
    },
  })

  console.log(d)
}
