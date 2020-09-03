import googleAuthWrapper from "Renderer/providers/google/wrapper"

export const getPeople = async (): Promise<any> => {
  return googleAuthWrapper(
    "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses"
  )
}
