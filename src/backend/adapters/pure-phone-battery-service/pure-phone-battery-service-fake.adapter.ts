import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"

class PurePhoneBatteryServiceFakeAdapter extends PurePhoneBatteryServiceAdapter {
  public getBatteryLevel(): number {
    return 0.5
  }

  public getChargingStatus(): boolean {
    return false
  }

  public getMaximumCapacity(): number {
    return 0.95
  }
}

const createFakePurePhoneBatteryAdapter = (): PurePhoneBatteryServiceAdapter =>
  new PurePhoneBatteryServiceFakeAdapter()

export default createFakePurePhoneBatteryAdapter
