import Page from "./page"

class HomePage extends Page {
  get homeHeader() {
    return $("h2*=Welcome to Mudita Center")
  }

  get notNowButton() {
    return $("button*=Not now")
  }
}
export default new HomePage()
