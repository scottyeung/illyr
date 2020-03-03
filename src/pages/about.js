import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './cv.module.css'
import Layout from "../components/layout"

class AboutIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const person = get(this, 'props.data.allContentfulPerson.edges[0].node.shortBio')

    return (
      <Layout location={this.props.location} >
        <div className={styles.cv}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
          <p className={styles.about} dangerouslySetInnerHTML={{__html: person.childMarkdownRemark.html}} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutIndex

export const pageQuery = graphql`
 query AboutQuery {
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
