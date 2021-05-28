/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// node is a representation of each file
const path = require(`path`); // path comes with gatsby-node by default
// const {createFilePath} = require(`gatsby-source-filesystem`)

// when create a page, it will call graphql, use all the markdown remark
exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions
    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
    .then(result => { // loop through all the markdown files
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.slug + "/",
                // manually create the page using blog-post template
                component: path.resolve(`./src/templates/blog-post.js`),
                // send slug variable to blog-post template
                context: {
                    slug: node.frontmatter.slug
                }
            })
        });
    })
}