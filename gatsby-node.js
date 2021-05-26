/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// node is a representation of each file
const path = require(`path`); // path comes with gatsby-node by default
const {createFilePath} = require(`gatsby-source-filesystem`)

//getNode: fetch node, get them
// exports.onCreateNode = ({node, getNode, actions}) => {
//     const {createNodeField} = actions
//     if(node.internal.type === `MarkdownRemark`){
//        // create slug dynamically and attach it to node
//         const slug = createFilePath({node, getNode})

//         createNodeField({
//             node,
//             name:`slug`, //name of property
//             value: slug
//         })
//     }
// }

// when create a page, it will call graphql, use all the markdown remark
exports.createPages = ({graphql, actions}) => {
    const { createPage } = actions
    // the query returns a promise
    // return graphql(`
    // {
    //     allMarkdownRemark {
    //       edges {
    //         node {
    //           fields {
    //             slug
    //           }
    //         }
    //       }
    //     }
    //   }
    // `)
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
          console.log(JSON.stringify(node))
            createPage({
                path: node.frontmatter.slug,
                // manually create the page using blog-post template
                component: path.resolve(`./src/templates/blog-post.js`),
                context: {
                    slug: node.frontmatter.slug
                }
            })
        });
    })
}