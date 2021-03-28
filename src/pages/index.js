import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
  {console.log("data",data)}
    <SEO title="Home" />
    {
      data.allMarkdownRemark.edges.map(node => {
        return(
          <div>
            <h2>{node.node.frontmatter.title}</h2>
            <p>{node.node.excerpt}</p>
          </div>
        )
      })
    }

  </Layout>
)

export default IndexPage

export const query = graphql`
  query  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          html
          frontmatter {
            date
            description
            title
          }
        }
      }
    }
  }
`
