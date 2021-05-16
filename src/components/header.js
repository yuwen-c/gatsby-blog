import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import avatar from "../images/githubAvatar.jpg";

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#765D69`,
      marginBottom: `1.45rem`,
    }}
  >
    <div className="pv3"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#8FB9A8`,
            textDecoration: `none`,
            fontWeight: `700`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className="pb3">
      <img
      src={avatar}
      className="br-100 h3 w3 " alt="avatar">
      </img>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
