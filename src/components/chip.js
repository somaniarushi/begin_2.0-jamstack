/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { useState, useRef } from "react"
import PropTypes from "prop-types"

export default function Chip({ children, ...props }) {
  const [isToggled, setIsToggled] = useState(false)
  const ref = useRef(null)

  function onClick() {
    if (ref.current) {
      if (isToggled) {
        ref.current.classList.remove("active")
      } else {
        ref.current.classList.add("active")
      }
    }
    setIsToggled(!isToggled)

    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <Button ref={ref} variant="chip" onClick={onClick}>
      {children}
    </Button>
  )
}
Chip.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
