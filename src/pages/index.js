import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({data}) => (
  <Layout>
    <SEO title="Home" />
    {
      data.allMarkdownRemark.edges.map(({node}) => {
        return(
          <div key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
            <a href={node.fields.slug}>Read more</a>
          </div>
        )
      })
    }

  </Layout>
)


export const query = graphql`
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
  }
`
