import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"

interface Props {
  batteryLevel?: number
  charging?: boolean
}

// const getBarsBasedOnBatterLevel = (batteryLevel: number) => {
//   switch (batteryLevel) {
//     case:
//   }
// }

const Battery: FunctionComponent<Props> = ({
  charging,
  children,
  className,
  batteryLevel,
}) => {
  return (
    <svg className={className} width="24" height="16" viewBox="0 0 24 16">
      <rect width="21.6" height="15.36" fill="#6A6A6A" rx="1" />
      <path fill="#FFF" d="M1.2 1.28H20.4V14.08H1.2z" />
      {children}
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
