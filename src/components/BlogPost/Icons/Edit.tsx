import React from "react"
import { css } from "@emotion/core"

type EditProps = {
  className?: string
  width?: number
  height?: number
  color?: string
}

export const Edit: React.FC<EditProps> = ({
  className,
  width,
  height,
  color,
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    width={width}
    height={height}
    css={css`
      ${color && `fill: ${color};`}
    `}
  >
    <path d="M19.045 7.401C19.423 7.023 19.631 6.521 19.631 5.987C19.631 5.453 19.423 4.951 19.045 4.573L17.459 2.987C17.081 2.609 16.579 2.401 16.045 2.401C15.511 2.401 15.009 2.609 14.632 2.986L4 13.585V18H8.413L19.045 7.401ZM16.045 4.401L17.632 5.986L16.042 7.57L14.456 5.985L16.045 4.401ZM6 16V14.415L13.04 7.397L14.626 8.983L7.587 16H6ZM4 20H20V22H4V20Z" />
  </svg>
)
