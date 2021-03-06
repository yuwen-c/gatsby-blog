import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `#765D69`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      className="pv3"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#FEFAD4`,
            textDecoration: `none`,
            fontWeight: `700`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className="pb3">
      <StaticImage
        className="br-100 h3 w3"
        src="../images/githubAvatar.jpg"
        alt="avatar"
      />
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
