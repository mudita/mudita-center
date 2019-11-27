import React, { ReactElement } from "react"
import ReactDOM from "react-dom"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Router } from "react-router"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/modal/modal.component"
import localeEn from "Renderer/locales/main/en-US.json"
import history from "Renderer/routes/history"
import { Store } from "Renderer/store"

class ModalService {
  private store?: Store
  private defaultLocale?: string
  private modalElement: HTMLDivElement | null = null
  private backdropElement: HTMLDivElement | null = null
  private modal: boolean = false
  private backdrop: boolean = false
  private allowClosing: boolean = true
  private closeBackdrop: boolean = true

  public bindStore(value: Store) {
    this.store = value
  }

  public setDefaultLocale(value: string) {
    this.defaultLocale = value
  }

  public isModalOpen() {
    return this.modal && this.backdrop
  }

  public async closeModal(force: boolean = false) {
    if (this.allowClosing || force) {
      const animationEndPromise = (element: HTMLElement) => {
        return new Promise(resolve => {
          const child = element.firstChild as HTMLElement
          child.style.animationName = "fadeOut"
          child.addEventListener("webkitAnimationEnd", () => {
            resolve()
          })
        })
      }

      const { modalElement, backdropElement, modal } = this

      if (modalElement && backdropElement && modal) {
        const modalPromise = animationEndPromise(modalElement)
        const allPromises = [modalPromise]

        if (this.closeBackdrop) {
          const backdropPromise = animationEndPromise(backdropElement)
          allPromises.push(backdropPromise)
        }

        await Promise.all(allPromises)

        this.unMountModal()
        if (this.closeBackdrop) {
          this.unMountBackdrop()
        }
      }
      this.closeBackdrop = true
    }
  }

  public async openModal(modal: ReactElement, force: boolean = false) {
    if (this.isModalOpen()) {
      if (force) {
        this.closeBackdrop = false
        await this.closeModal(true)
      } else {
        throw new Error(
          "Another modal is currently opened. Use openModal with force param."
        )
      }
    }
    this.allowClosingModal(true)
    this.mountBackdrop()
    this.renderBackdrop()
    this.mountModal()
    this.renderModal(modal)
  }

  public allowClosingModal(allow: boolean = true) {
    this.allowClosing = allow
  }

  private mountModal = () => {
    this.modalElement = document.createElement("div")
    document.body.appendChild(this.modalElement)
  }

  private mountBackdrop = () => {
    if (!this.backdrop) {
      this.backdropElement = document.createElement("div")
      document.body.appendChild(this.backdropElement)
      this.backdropElement!.addEventListener("click", async () => {
        await this.closeModal()
      })
    }
  }

  private unMountModal = () => {
    this.modal = false
    this.modalElement!.remove()
  }

  private unMountBackdrop = () => {
    this.backdrop = false
    this.backdropElement!.remove()
  }

  private renderModal = (modal: ReactElement) => {
    try {
      if (this.store && this.defaultLocale) {
        ReactDOM.render(
          <Provider store={this.store}>
            <IntlProvider
              defaultLocale={this.defaultLocale}
              locale={this.defaultLocale}
              messages={localeEn}
            >
              <Router history={history}>
                <ModalWrapper>{modal}</ModalWrapper>
              </Router>
            </IntlProvider>
          </Provider>,
          this.modalElement
        )
        this.modal = true
      }
    } catch (error) {
      throw error
    }
  }

  private renderBackdrop = () => {
    ReactDOM.render(<ModalBackdrop />, this.backdropElement)
    this.backdrop = true
  }
}

const modalService = new ModalService()

export default modalService
