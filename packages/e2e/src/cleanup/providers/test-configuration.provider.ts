import config from "../../../configrc.json"
import { Config } from "../types"
import { TestConfigurationProviderClass } from "./test-configuration-provider.class"

export class TestConfigurationProvider
  implements TestConfigurationProviderClass
{
  public config: Config = config
}
