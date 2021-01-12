import {
  CreateDevice,
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "./device.types"
import { Contact, CountBodyResponse, DeviceInfo } from "../endpoints"
import { Formatter, FormatterFactory } from "../formatter"
import BaseDevice from "./base-device"

class Device extends BaseDevice {
  #formatter: Formatter

  constructor(private formatterFactory: FormatterFactory, path: string) {
    super(path)
    this.#formatter = this.formatterFactory.create()
  }

  public async connect(): Promise<Response> {
    const response = await super.connect()
    const { body } = await super.request({
      endpoint: Endpoint.ApiVersion,
      method: Method.Get,
    })

    if (body === undefined) {
      return { status: ResponseStatus.ConnectionError }
    }

    this.#formatter = this.formatterFactory.create(body.version)

    return response
  }

  public request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<Response<DeviceInfo>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: true }
  }): Promise<Response<CountBodyResponse>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: number }
  }): Promise<Response<Contact[]>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Post
    body: Contact
  }): Promise<Response<Contact>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Put
    body: Contact
  }): Promise<Response<Contact>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Delete
    body: Contact["id"]
  }): Promise<Response<string>>
  public request(config: {
    endpoint: Endpoint.DeviceUpdate
    method: Method.Post
    file: string
  }): Promise<Response>
  public request(config: {
    endpoint: Endpoint.FileUpload
    method: Method.Post
    file: string
  }): Promise<Response>
  public request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    const formattedConfig = this.#formatter.formatRequestConfig(config)
    const response = await super.request(formattedConfig)

    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createDevice: CreateDevice = (path: string) =>
  new Device(new FormatterFactory(), path)
