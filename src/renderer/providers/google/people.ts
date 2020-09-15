import { AxiosResponse } from "axios"
import googleAuthWrapper from "Renderer/providers/google/wrapper"
import { Base, Details } from "Renderer/providers/google/endpoints"
import { queryBuilder } from "Renderer/providers/google/helpers"
import { GoogleContactsSuccess } from "Renderer/providers/google/typings"

const query = ["names", "emailAddresses", "phoneNumbers"]

export const getPeople = async (): Promise<
  AxiosResponse<GoogleContactsSuccess>
> => {
  return googleAuthWrapper(
    `${Base.People}/${Details.PeopleConnect}?personFields=${queryBuilder(
      query
    )}`
  )
}
