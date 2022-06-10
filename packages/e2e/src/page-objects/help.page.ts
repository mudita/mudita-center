import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class HelpPage extends Page {
  public get helpListElement(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-component-question"]')
  }
}

export default new HelpPage()