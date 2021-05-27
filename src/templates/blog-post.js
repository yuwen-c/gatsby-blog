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
    const {slug, title, featuredImage, date} = data.markdownRemark.frontmatter;
    const {siteUrl} = data.siteUrl.siteMetadata;

    const imageURLOfSeo = siteUrl + getSrc(featuredImage.childImageSharp)
    const pageUrl = siteUrl + slug;

    return (
        <Layout>
            <SEO
                title={title}
                imageURL={imageURLOfSeo}
                pageURL={pageUrl}
                isArticle={true}
                date={date}
            />
            <BlogTitle>{title}</BlogTitle>
            <div className="lh-copy" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
        </Layout>
    )
}

export default blogPost;

// 不用useStaticQuery, 因為要利用 "從node.js傳來的slug變數" 叫出那一篇post
export const query = graphql`
    query($slug: String!){
        markdownRemark( frontmatter: {slug: {eq: $slug}}){
            html
            frontmatter{
                date
                slug
                title
                featuredImage {
                    childImageSharp {
                      gatsbyImageData(layout: FIXED)
                    }
                }
            }

        }
        siteUrl: site{
            siteMetadata {
                siteUrl
            }
        }

    }
`