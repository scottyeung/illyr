import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './cv.module.css'
import Layout from "../components/layout"
import Img from 'gatsby-image'
import Draggable from 'react-draggable'; 
import { MobileView } from "react-device-detect";

class AboutIndex extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const person = get(this, 'props.data.allContentfulPerson.edges[0].node')

    let max = 500, min = 900;

    return (
      <Layout location={this.props.location} >
        <div className={styles.cv}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
          <p className={styles.about} dangerouslySetInnerHTML={{__html: person.shortBio.childMarkdownRemark.html}} />
          <MobileView>
          <div className="draggable" style={{height: '300px', width: '100%', overflow:'hidden', position: 'relative'}}>
          {person.draggableGallery.map((items, i) => (
            <Draggable key={i} handle=".handle" style={{position: 'relative'}}><div>
              <Img className="handle" fluid={items.fluid} style={{position: 'absolute', top: `Math.floor(Math.random() * (max) / 2)`, left: Math.floor(Math.random() * (min) / 2), width: '150px'}} />
              </div></Draggable>
          ))}
          </div>
          </MobileView>
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
            draggableGallery {
              fluid(maxWidth: 1680, quality: 100) {
                ...GatsbyContentfulFluid_tracedSVG
               }
            }
          }
        }
      }
  }  
`
