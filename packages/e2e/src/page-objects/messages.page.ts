import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class MessagesPage extends Page {
  public get newMessageButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-panel-new-message-button"]')
  }

  public get searchContactsInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="receiver-input-select-input"]')
  }

  public get messageInput(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-details-text-area-input"]')
  }

  public get notSendMessageIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="message-bubble-not-send-icon"]')
  }

  public get notSendThreadIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="thread-not-send-message-icon"]')
  }
}

export default new MessagesPage()
