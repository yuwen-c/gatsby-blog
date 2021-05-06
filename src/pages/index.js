import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components";
import Layout from "../components/layout"
import SEO from "../components/seo"

// make the blog link, (allow our link title clickable)
// if apply the <Link> directly to title, it'll show the underline...a tag style, ugly
const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-top: 20px;
  color: purple;
`

export default ({data}) => (
  <Layout>
    <SEO title="Home" />
    {
      data.allMarkdownRemark.edges.map(({node}) => {
        return(
          <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>{node.frontmatter.title}</BlogTitle>
            </BlogLink>
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
            <a href={node.fields.slug}>Read more</a>
          </div>
        )
      })
    }

  </Layout>
)

// sort: order the posts by descending date
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
