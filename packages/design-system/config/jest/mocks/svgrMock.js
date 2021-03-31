import React from "react"

const SvgComponent = (props) => (
  <svg
    data-testid="svg"
    viewBox="0 0 10 8"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    color="#000"
    {...props}
  >
    <path
      d="M1 3.404l2.998 2.913L9 1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgComponent
