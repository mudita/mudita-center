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
}

export default new MessagesPage()
