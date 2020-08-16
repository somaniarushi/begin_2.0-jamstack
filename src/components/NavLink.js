/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const NavLink = ({ href, ...props }) => (
  <Link
    to={props.to || href}
    sx={{ variant: "links.nav" }}
    {...props}
    activeClassName="active"
  />
)
NavLink.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
}

export default NavLink
