/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// node is a representation of each file
const {createFilePath} = require(`gatsby-source-filesystem`)

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