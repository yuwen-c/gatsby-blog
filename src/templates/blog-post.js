import React from 'react';
import { graphql } from 'gatsby';
import styled from "styled-components";
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getSrc } from "gatsby-plugin-image"

const BlogTitle = styled.h1`
  margin-top: 20px;
  color: #8FB9A8;
`
const blogPost = ({ data }) => {
    const post = data.markdownRemark

    const imageURLOfSeo =
    data.siteUrl.siteMetadata.siteUrl + getSrc(post.frontmatter.featuredImage.childImageSharp)

    return (
        <Layout>
            <SEO
                title={post.frontmatter.title}
                imageURL={imageURLOfSeo}
                pageURL={data.siteUrl.siteMetadata.siteUrl}
                isArticle={true}
            />
            <BlogTitle>{post.frontmatter.title}</BlogTitle>
            <div className="lh-copy" dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </Layout>

    )
}

export default blogPost;

export const query = graphql`
    query($slug: String!){
        markdownRemark( fields: {slug: {eq: $slug}}){
            html
            frontmatter{
                title
                featuredImage {
                    childImageSharp {
                      gatsbyImageData(layout: FIXED)
                    }
                }
            }
            fields{
                slug
            }
        }
        siteUrl: site{
            siteMetadata {
                siteUrl
            }
        }

    }
`