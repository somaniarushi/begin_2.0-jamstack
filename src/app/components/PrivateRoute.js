import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { useIdentityContext } from "react-netlify-identity-widget"

function PrivateRoute(props) {
  const { isLoggedIn } = useIdentityContext()
  const { component: Component, location, ...rest } = props

  React.useEffect(
    () => {
      if (!isLoggedIn && location.pathname !== `/app/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/app/login`)
      }
    },
    [isLoggedIn, location]
  )
  return isLoggedIn ? <Component {...rest} /> : null
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,

}

export default PrivateRoute
