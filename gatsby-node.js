const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulCv {
              edges {
                node {
                  title
                  slug
                  publishDate(formatString: "MMMM Do, YYYY")
                  tags
                  description {
                    childMarkdownRemark {
                      html
                    }
                  }
                }
              }
            }
            allContentfulPerson {
              edges {
                node {
                  shortBio {
                    childMarkdownRemark {
                      html
                    }
                  }
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
      })
    )
  })
}
