import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({data}) => (
  <Layout>
  {console.log("data",data)}
    <SEO title="Home" />
    {
      data.allMarkdownRemark.edges.map(node => {
        return(
          <div key={node.node.frontmatter.title}>
            <h3>{node.node.frontmatter.title}</h3>
            <span>{node.node.frontmatter.date}</span>
            <p>{node.node.excerpt}</p>
          </div>
        )
      })
    }

  </Layout>
)


export const query = graphql`
  query  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
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
