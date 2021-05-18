import React from 'react';
import { graphql } from 'gatsby';
import styled from "styled-components";
import Layout from '../components/layout';

const BlogTitle = styled.h1`
  margin-top: 20px;
  color: #8FB9A8;
`
const blogPost = ({data}) => {
    const post = data.markdownRemark
    return(
        <Layout>
            <BlogTitle>{post.frontmatter.title}</BlogTitle>
            <div className="lh-copy" dangerouslySetInnerHTML={{__html: post.html}}></div>
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
            }
        }
    }
`