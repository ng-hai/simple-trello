/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { resolve } = require('path')

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/',
    matchPath: '/:path',
    component: resolve(__dirname, './src/app.js'),
  })
}
