import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getSrc } from "gatsby-plugin-image"

const BlogTitle = styled.h1`
  margin-top: 20px;
  color: #556f64;
`
// #8FB9A8

const blogPost = ({ data }) => {
  const {
    slug,
    title,
    description,
    featuredImage,
    date,
  } = data.markdownRemark.frontmatter
  const { siteUrl } = data.siteUrl.siteMetadata
  const imageURLOfSeo = siteUrl + getSrc(featuredImage.childImageSharp)
  const pageUrl = siteUrl + "/" + slug.toLowerCase() + "/"
  console.log(pageUrl)

  return (
    <Layout>
      <SEO
        title={title}
        imageURL={imageURLOfSeo}
        description={description}
        pageURL={pageUrl}
        isArticle={true}
        date={date}
      />
      <BlogTitle>{title}</BlogTitle>
      <p>{date}</p>
      <div
        className="lh-copy"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      ></div>
    </Layout>
  )
}

export default blogPost

// 不用useStaticQuery, 因為要利用 "從node.js傳來的slug變數" 叫出那一篇post
export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        slug
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
    }
    siteUrl: site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
