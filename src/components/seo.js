/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"


const SEO = ({ description, lang, meta, title, imageURL, pageURL, isArticle }) => {
  console.log("imageURL from seo", imageURL)
  const { site, siteImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            
          }
        }
        siteImage: file(relativePath: { eq: "yuwen-c_large.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
    `
  )

  //當blog post沒有圖片時，連結預覽會補上網站代表圖
  const fixedSrc = site.siteMetadata.siteUrl + getSrc(siteImage.childImageSharp)
  const metaImage = imageURL || fixedSrc
  const metaDescription = description || site.siteMetadata.description
  // 設定在gatsby-config.js的siteMetadata裡面的title, 代表整個網站的總title
  const defaultTitle = site.siteMetadata?.title
  const metaURL = pageURL || site.siteMetadata.siteUrl

  return (
    <React.Fragment>
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title} //index.js傳來的props, 代表首頁的title
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null} // 該頁title|總title
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:url`,
          content: metaURL,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
    {
        // blog post(article) or homepage(website)
        isArticle ? (
          <Helmet>
            <meta property="og:type" content="article" />
            <meta property="article:author" content={site.siteMetadata.siteUrl} />
          </Helmet>
        ) : (
          <Helmet>
            <meta property="og:type" content="website" />
          </Helmet>
        )
      }
    </React.Fragment>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
