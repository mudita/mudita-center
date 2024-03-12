import Page from "./page";

class HomePage extends Page {
    get homeHeader() {
        return $("h2*=Welcome to Mudita Center")
    }
} export default new HomePage()