import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

interface Props {
  batteryLevel: number
  charging?: boolean
}

const BatteryWrapper = styled.div`
  position: relative;
`

const BatteryChargingText = styled(Text)`
  position: absolute;
  top: 25%;
  left: 15%;
  font-size: 0.8rem;
`

const getInteractiveBatteryIcon = (
  batteryLevel: number,
  charging: boolean,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case charging:
      return (
        <BatteryWrapper>
          <Icon type={Type.ChargingBattery} {...rest} />
          <BatteryChargingText displayStyle={TextDisplayStyle.SmallFadedText}>
            {batteryLevel * 100}%
          </BatteryChargingText>
        </BatteryWrapper>
      )
    case batteryLevel > 80:
      return <Icon type={Type.VeryHighRange} {...rest} />
    case batteryLevel > 60:
      return <Icon type={Type.HighRange} {...rest} />
    case batteryLevel > 40:
      return <Icon type={Type.MediumRange} {...rest} />
    case batteryLevel > 20:
      return <Icon type={Type.LowRange} {...rest} />
    case batteryLevel > 0:
      return <Icon type={Type.VeryLowBattery} {...rest} />
    default:
      return <Icon type={Type.NoBattery} {...rest} />
  }
}

const BatteryIcon: FunctionComponent<Props & IconProps> = ({
  batteryLevel,
  charging = false,
  ...rest
}) => {
  return <>{getInteractiveBatteryIcon(batteryLevel, charging, rest)}</>
}

export default BatteryIcon
