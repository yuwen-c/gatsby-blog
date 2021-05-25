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
              }
              fields {
                slug
              }
            }
          }
        }
        indexImage: file(relativePath: {eq: "yuwen-c_large.png"}) {
          childImageSharp {
            gatsbyImageData(transformOptions: {fit: COVER})
          }
        }
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )


  // const imageData = data.indexImage.childImageSharp.gatsbyImageData

  const imageURLOfSeo =
    data.site.siteMetadata.siteUrl + getSrc(data.indexImage.childImageSharp)

  return (
    <Layout>
      <SEO
        title="Home"
        imageURL={imageURLOfSeo}
        pageURL="https://yuwen-c.netlify.app/"
        isArticle={false}
      />


      {
        data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <div key={node.id}>
              <BlogLink to={node.fields.slug}>
                <BlogTitle>{node.frontmatter.title}</BlogTitle>
              </BlogLink>
              <span>{node.frontmatter.date}</span>
              <p className="lh-copy">{node.frontmatter.description}</p>
              {/* <p>{node.excerpt}</p> */}
            </div>
          )
        })
      }

    </Layout>)
}

export default Index;

// sort: order the posts by descending date


