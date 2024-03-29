import { DragControls } from 'framer-motion'
import { forwardRef } from 'react'

interface Props {
  dragControls: DragControls
}

export const ReorderIcon = forwardRef<any, Props>(({ dragControls }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      onPointerDown={(event) => dragControls.start(event)}
    >
      <g clipPath="url(#clip0_1_2)">
        <rect width="24" height="1" fill="black" />
        <rect y="4.5" width="24" height="1" fill="black" />
        <rect y="9" width="24" height="1" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="24" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
})
