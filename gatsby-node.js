/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// node is a representation of each file
const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require(`path`); // path comes with gatsby-node by default
//getNode: fetch node, get them
exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions
    if(node.internal.type === `MarkdownRemark`){
       // create slug dynamically and attach it to node
        const slug = createFilePath({node, getNode,basePath: `pages`})

        createNodeField({
            node,
            name:`slug`, //name of property
            value: slug
        })
    }
}


exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions
    // the query returns a promise
    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    .then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context: {
                    slug: node.fields.slug
                }
            })
        });
    })
}