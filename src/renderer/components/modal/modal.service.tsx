import { ReactNode } from "react"
import { Store } from "redux"
import RootState from "Renderer/reducers/state"

class ModalService {
  private store: Store<RootState | undefined> | null = null
  private defaultLocale: string = "en-US"
  private domEl: ReactNode = null
  private modal: boolean = false

  public bindStore(value: Store) {
    this.store = value
  }

  public setDefaultLocale(value: string) {
    this.defaultLocale = value
  }

  public isModalOpen() {
    return this.modal
  }

  public closeCurrentModal() {
    this.modal = false
  }

  public openModal(modal: ReactNode) {
    if (!this.isModalOpen()) {
      this.domEl = modal

      this.modal = true
    } else {
      throw new Error(
        "Another modal is currently opened. Use forceModal method instead."
      )
    }
  }

  public forceModal(modal: ReactNode) {
    this.closeCurrentModal()
    this.openModal(modal)
  }
}

const modalService = new ModalService()

export default modalService
