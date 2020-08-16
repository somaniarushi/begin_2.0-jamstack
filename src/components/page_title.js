import React from "react"
import { Heading } from "theme-ui"
import PropTypes from "prop-types"

export default function PageTitle({ children }) {
  return (
    <Heading as="h1" variant="pageTitle">
      {children}
    </Heading>
  )
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
}
