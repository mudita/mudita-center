import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class ModalGeneralPage extends Page {
  public get closeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }
}

export default new ModalGeneralPage()
