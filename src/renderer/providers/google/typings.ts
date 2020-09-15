export interface GoogleAuth {
  token_type: string
  access_token: string
}

export interface GoogleBaseResponse {
  resourceName: string
  etag?: string
}

// Remember to extends this after implementing more answers
export enum GoogleObjectType {
  OBJECT_TYPE_UNSPECIFIED = "OBJECT_TYPE_UNSPECIFIED",
  PERSON = "PERSON",
  PAGE = "PAGE",
}

export enum GoogleUserType {
  USER_TYPE_UNKNOWN = "USER_TYPE_UNKNOWN",
  GOOGLE_USER = "GOOGLE_USER",
  GPLUS_USER = "GPLUS_USER",
  GOOGLE_APPS_USER = "GOOGLE_APPS_USER",
}

export enum GoogleMetadataSourceType {
  SOURCE_TYPE_UNSPECIFIED = "SOURCE_TYPE_UNSPECIFIED",
  ACCOUNT = "ACCOUNT",
  PROFILE = "PROFILE",
  DOMAIN_PROFILE = "DOMAIN_PROFILE",
  CONTACT = "CONTACT",
  OTHER_CONTACT = "OTHER_CONTACT",
  DOMAIN_CONTACT = "DOMAIN_CONTACT",
}

export interface GoogleMetadata<T> {
  primary?: boolean
  verified?: boolean
  source?: {
    id: string
    etag: string
    updateTime: string
    type: GoogleMetadataSourceType
    profileMetadata: T
  }
}

export interface GoogleUserMetadata {
  objectType?: GoogleObjectType[]
  userTypes: GoogleUserType[]
}

export interface GooglePersonEmail extends GoogleMetadata<GoogleUserMetadata> {
  value: string
  type?: string
  formattedType?: string
  displayName?: string
}

export interface GooglePersonPhoneNumber
  extends GoogleMetadata<GoogleUserMetadata> {
  value: string
  canonicalForm?: string
  type?: string
  formattedType?: string
}

export interface GooglePersonName extends GoogleMetadata<GoogleUserMetadata> {
  displayName?: string
  displayNameLastFirst?: string
  unstructuredName?: string
  familyName?: string
  givenName?: string
  middleName?: string
  honorificPrefix?: string
  honorificSuffix?: string
  phoneticFullName?: string
  phoneticFamilyName?: string
  phoneticGivenName?: string
  phoneticMiddleName?: string
  phoneticHonorificPrefix?: string
  phoneticHonorificSuffix?: string
}

export interface GooglePerson extends GoogleBaseResponse {
  emailAddresses?: GooglePersonEmail[]
  phoneNumbers?: GooglePersonPhoneNumber[]
  names?: GooglePersonName[]
}

export interface GoogleContactsSuccess {
  connections: GooglePerson[]
  totalItems: number
}
