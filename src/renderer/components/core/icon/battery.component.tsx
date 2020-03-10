import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"

interface Props {
  batteryLevel: number
  charging?: boolean
}

const getBarsBasedOnBatteryLevel = (batteryLevel: number) => {
  switch (true) {
    case batteryLevel === 0:
      return []
    case batteryLevel > 0 && batteryLevel <= 0.2:
      return [
        {
          x: "2.4",
        },
      ]
    case batteryLevel > 0.2 && batteryLevel <= 0.4:
      return [
        {
          x: "2.4",
        },
        {
          x: "6",
        },
      ]
    case batteryLevel > 0.4 && batteryLevel <= 0.6:
      return [
        {
          x: "2.4",
        },
        {
          x: "6",
        },
        {
          x: "9.6",
        },
      ]
    case batteryLevel > 0.6 && batteryLevel <= 0.8:
      return [
        {
          x: "2.4",
        },
        {
          x: "6",
        },
        {
          x: "9.6",
        },
        {
          x: "13.2",
        },
      ]
    case batteryLevel > 0.8 && batteryLevel <= 1:
      return [
        {
          x: "2.4",
        },
        {
          x: "6",
        },
        {
          x: "9.6",
        },
        {
          x: "13.2",
        },
        {
          x: "16.8",
        },
      ]
    default:
      return
  }
}

const Battery: FunctionComponent<Props> = ({
  charging,
  className,
  batteryLevel,
}) => {
  const batteryBars = getBarsBasedOnBatteryLevel(batteryLevel)
  return (
    <svg className={className} width="24" height="16" viewBox="0 0 24 16">
      <rect width="21.6" height="15.36" fill="#6A6A6A" rx="1" />
      <path fill="#FFF" d="M1.2 1.28H20.4V14.08H1.2z" />
      {batteryBars && batteryBars.length === 0 && (
        <path
          fill="#6A6A6A"
          d="M11.743 8.357c0 .114-.1.229-.229.229H9.971c-.128 0-.228-.115-.228-.229V2.63c0-.115.1-.229.228-.229h1.543c.129 0 .229.114.229.229v5.728zM9.886 12.4c-.157 0-.286-.129-.286-.286V10.4c0-.157.129-.286.286-.286H11.6c.157 0 .286.129.286.286v1.714c0 .157-.129.286-.286.286H9.886z"
        />
      )}
      {batteryBars &&
        !charging &&
        batteryBars.map(({ x }) => {
          return (
            <rect
              data-testid="bar"
              key={x}
              width="2.4"
              height="11.52"
              x={x}
              y="1.92"
              fill="#6A6A6A"
              rx=".4"
            />
          )
        })}
      {charging && (
        <text
          fill="#6A6A6A"
          fontFamily="GTPressura-Bold, GT Pressura"
          fontSize="8"
          fontWeight="bold"
        >
          <tspan x="4.62" y="10.7">
            {batteryLevel && batteryLevel * 100}%
          </tspan>
        </text>
      )}
      <path
        fill="#6A6A6A"
        d="M21.6 3.2H23c.552 0 1 .448 1 1v6.96c0 .552-.448 1-1 1h-1.4V3.2z"
      />
    </svg>
  )
}

export default Battery
