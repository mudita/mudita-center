import { ConnectedRouter } from "connected-react-router"
import React, { ReactElement } from "react"
import ReactDOM from "react-dom"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Store } from "redux"
import { ModalWrapper } from "Renderer/components/modal/modal.component"
import localeEn from "Renderer/locales/main/en-US.json"
import RootState from "Renderer/reducers/state"
import history from "Renderer/routes/history"

type ModalType = ReactElement

class ModalService {
  private store?: Store<RootState | undefined>
  private defaultLocale?: string
  private domEl: HTMLDivElement | null = null
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
    if (this.isModalOpen()) {
      this.modal = false
      this.domEl!.remove()
    }
  }

  public openModal(modal: ModalType) {
    try {
      if (this.isModalOpen()) {
        throw new Error(
          "Another modal is currently opened. Use forceModal method instead."
        )
      }
      this.domEl = document.createElement("div")
      document.body.appendChild(this.domEl)
      this.Render(modal)
      this.modal = true
    } catch (error) {
      throw error
    }
  }

  public forceModal(modal: ModalType) {
    this.closeCurrentModal()
    this.openModal(modal)
  }

  private Render = (modal: ModalType) => {
    try {
      if (this.store && this.defaultLocale) {
        ReactDOM.render(
          <Provider store={this.store}>
            <IntlProvider
              defaultLocale={this.defaultLocale}
              locale={this.defaultLocale}
              messages={localeEn}
            >
              <ConnectedRouter history={history}>
                <ModalWrapper>{modal}</ModalWrapper>
              </ConnectedRouter>
            </IntlProvider>
          </Provider>,
          this.domEl
        )
      }
    } catch (error) {
      throw error
    }
  }
}

const modalService = new ModalService()

export default modalService
