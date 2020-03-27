import { createClient } from "contentful"

const spaceId = "isxmxtc67n72"
const accessToken = "4OjM0WvVo9FOXtnUmZdCKflW_Ra9qD--W8hdTvTVwGM"

const client = createClient({
  space: spaceId,
  accessToken,
})

export default client
