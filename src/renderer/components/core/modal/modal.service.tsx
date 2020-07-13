/*
  There can be an issue when a modal will be requested to open just after the closing
  the previous one, without awaiting the closing procedure to end.

  modalService.close()
  modalService.open()

  This will lead to an error, since the closing take some time (it waits for the
  closing animation to finish before reporting the "ok" status.

  In this, rather unlikely, scenario, the service should be refactored.
*/
import React, { createContext, ReactElement, useContext } from "react"
import ReactDOM from "react-dom"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Router } from "react-router"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import localeEn from "Renderer/locales/main/en-US.json"
import history from "Renderer/routes/history"
import { Store } from "Renderer/store"
import { ThemeProvider } from "styled-components"
import theme from "Renderer/styles/theming/theme"
import FunctionComponent from "Renderer/types/function-component.interface"

enum ModalError {
  NoModalToClose = "Close modal action cannot be performed. There is no modal opened.",
  ClosingForbidden = "Cannot close current modal. If you really want to close it, use force parameter or call allowClosingModal(true) method.",
  AnotherModalOpened = "Another modal is already opened. Modal added to queue.",
}

const logError = (message: ModalError) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Modal error: ${message}`)
  }
}

interface EventListeners {
  type: string
  element: Node
  event: (e: Event) => void
}

export class ModalService {
  private store?: Store
  private defaultLocale?: string
  private modalElement: HTMLDivElement | null = null
  private backdropElement: HTMLDivElement | null = null
  private modalOpened: boolean = false
  private backdropOpened: boolean = false
  private modalClosingAllowed: boolean = true
  private backdropClosingAllowed: boolean = true
  private eventListeners: EventListeners[] = []
  private modalsQueue: ReactElement[] = []

  public bindStore(value: Store) {
    if (!this.store) {
      this.store = value
    }
  }

  public setDefaultLocale(value: string) {
    if (!this.defaultLocale) {
      this.defaultLocale = value
    }
  }

  public isModalOpen() {
    return this.modalOpened && this.backdropOpened
  }

  public async closeModal(force: boolean = false) {
    if (!this.isModalOpen()) {
      logError(ModalError.NoModalToClose)
      return
    }
    if (!this.modalClosingAllowed && !force) {
      logError(ModalError.ClosingForbidden)
      return
    }

    if (this.modalsQueue.length) {
      this.openModal(this.modalsQueue.shift() as ReactElement, true)
      return
    }

    const animationEndPromise = (element: HTMLElement) => {
      return new Promise((resolve) => {
        const child = element.firstChild as HTMLElement
        child.style.animationName = "fadeOut"

        this.registerEventListener(
          "webkitAnimationEnd",
          child,
          () => {
            resolve()
          },
          true
        )
      })
    }

    const { modalElement, backdropElement, modalOpened } = this

    if (modalElement && backdropElement && modalOpened) {
      const modalPromise = animationEndPromise(modalElement)
      const allPromises = [modalPromise]

      if (this.backdropClosingAllowed) {
        const backdropPromise = animationEndPromise(backdropElement)
        allPromises.push(backdropPromise)
      }

      await Promise.all(allPromises)

      this.unMountModal()
      if (this.backdropClosingAllowed) {
        this.unMountBackdrop()
      }
    }
    this.backdropClosingAllowed = true
  }

  public async openModal(modal: ReactElement, force: boolean = false) {
    if (this.isModalOpen()) {
      if (force) {
        this.backdropClosingAllowed = false
        await this.closeModal(true)
      } else {
        this.modalsQueue.push(modal)
        logError(ModalError.AnotherModalOpened)
        return
      }
    }
    this.allowClosingModal()
    this.mountBackdrop()
    this.renderBackdrop()
    this.mountModal()
    this.renderModal(modal)
  }

  public rerenderModal(modal: ReactElement) {
    if (this.isModalOpen()) {
      this.renderModal(modal)
    }
  }

  public allowClosingModal() {
    this.modalClosingAllowed = true
  }

  public preventClosingModal() {
    this.modalClosingAllowed = false
  }

  private registerEventListener(
    type: EventListeners["type"],
    element: EventListeners["element"],
    event: EventListeners["event"],
    once: boolean = false
  ) {
    const eventWrapper = (e: Event) => {
      event(e)
      if (once) {
        element.removeEventListener(type, eventWrapper)
      }
    }
    if (!once) {
      this.eventListeners.push({ type, element, event: eventWrapper })
    }
    element.addEventListener(type, eventWrapper)
  }

  private mountModal = () => {
    this.modalElement = document.createElement("div")
    document.body.appendChild(this.modalElement)
  }

  private mountBackdrop = () => {
    if (!this.backdropOpened) {
      this.backdropElement = document.createElement("div")
      document.body.appendChild(this.backdropElement)

      this.registerEventListener("click", this.backdropElement, () => {
        this.closeModal()
      })
    }
  }

  private unMountModal = () => {
    this.modalOpened = false
    this.modalElement!.remove()
  }

  private unMountBackdrop = () => {
    this.backdropOpened = false

    if (this.backdropElement) {
      this.backdropElement.remove()
      this.eventListeners.forEach(({ type, element, event }) => {
        element.removeEventListener(type, event)
      })
    }
  }

  private renderModal = (modal: ReactElement) => {
    if (this.store && this.defaultLocale) {
      ReactDOM.render(
        <Provider store={this.store}>
          <ModalProvider service={this}>
            <ThemeProvider theme={theme}>
              <IntlProvider
                defaultLocale={this.defaultLocale}
                locale={this.defaultLocale}
                messages={localeEn}
              >
                <Router history={history}>
                  <ModalWrapper>{modal}</ModalWrapper>
                </Router>
              </IntlProvider>
            </ThemeProvider>
          </ModalProvider>
        </Provider>,
        this.modalElement
      )
      this.modalOpened = true
    }
  }

  private renderBackdrop = () => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <ModalBackdrop />
      </ThemeProvider>,
      this.backdropElement
    )
    this.backdropOpened = true
  }
}

const modalService = new ModalService()

const ModalContext = createContext(modalService)

interface Props {
  service: ModalService
}

export const ModalProvider: FunctionComponent<Props> = ({
  service,
  children,
}) => {
  return (
    <ModalContext.Provider value={service}>{children}</ModalContext.Provider>
  )
}

export const useModalServiceContext = () => useContext(ModalContext)

export default modalService
