import { Client } from "App/api/contentful/client"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"

export const createClient = (config: { resource: ContentfulResource }) =>
  new Client(config)
