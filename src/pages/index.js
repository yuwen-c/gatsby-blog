import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import styled from "styled-components";
import Layout from "../components/layout"
import SEO from "../components/seo"
import tachyons from "tachyons"

// make the blog link, (allow our link title clickable)
// if apply the <Link> directly to title, it'll show the underline...a tag style, ugly
const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h1`
  margin-top: 20px;
  color: #8FB9A8;
`

const Index = () => {
  // sort: order the posts by descending date
  const data = useStaticQuery(
    graphql`
      query  {
        allMarkdownRemark (sort: {fields: frontmatter___date, order: DESC}){ 
          edges {
            node {
              id
              excerpt
              frontmatter {
                date
                description
                title
                slug
              }
            }
          }
        }
        indexImage: file(relativePath: {eq: "yuwen-c.png"}) {
          childImageSharp {
            gatsbyImageData(transformOptions: {fit: COVER})
          }
        }
        siteUrl: site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const {siteUrl} = data.siteUrl.siteMetadata;
  // image for seo, single url with getSrc 
  const imageURLOfSeo = siteUrl + getSrc(data.indexImage.childImageSharp)

  return (
    <Layout>
      <SEO
        title="Home"
        imageURL={imageURLOfSeo}
        pageURL={siteUrl}
        isArticle={false}
      />
      {
        data.allMarkdownRemark.edges.map(({ node }) => {
          const {date, description, title, slug} = node.frontmatter;
          return (
            <div key={node.id}>
              <BlogLink to={slug}>
                <BlogTitle>{title}</BlogTitle>
              </BlogLink>
              <span>{date}</span>
              <p className="lh-copy">{description}</p>
            </div>
          )
        })
      }
    </Layout>)
}

export default Index;




