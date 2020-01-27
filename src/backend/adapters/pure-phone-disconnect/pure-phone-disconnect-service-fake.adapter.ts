import PurePhoneDisconnectServiceAdapter from "Backend/adapters/pure-phone-disconnect/pure-phone-disconnect-service-adapter.class"

class PurePhoneDisconnectServiceFakeAdapter extends PurePhoneDisconnectServiceAdapter {
  public getDisconnectStatus(): boolean {
    return true
  }
}

const createFakePurePhoneDisconnectAdapter = (): PurePhoneDisconnectServiceAdapter =>
  new PurePhoneDisconnectServiceFakeAdapter()

export default createFakePurePhoneDisconnectAdapter
