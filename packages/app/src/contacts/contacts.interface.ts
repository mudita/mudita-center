import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export interface ExternalService {
  type: Provider
}

export interface FileService {
  type: "files"
  data: File[]
}
