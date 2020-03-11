import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './cv.module.css'
import Layout from "../components/layout"
import Img from 'gatsby-image'
import Draggable from 'react-draggable'; 
import { BrowserView, MobileView } from "react-device-detect";

class AboutIndex extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const person = get(this, 'props.data.allContentfulPerson.edges[0].node')

    let max = 100, min = 300;
    let d_max = 300, d_min = 300;

    return (
      <Layout location={this.props.location} >
        <div className={styles.cv}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
          <p className={styles.about} dangerouslySetInnerHTML={{__html: person.shortBio.childMarkdownRemark.html}} />
          <MobileView>
          <div className="draggable" style={{height: '700px', width: '300px', overflowX: 'hidden', position: 'relative'}}>
          {person.draggableGallery.map((items, i) => (
            <Draggable key={i} handle=".handle" style={{position: 'relative'}}><div>
              <Img className="handle" fluid={items.fluid} style={{position: 'absolute', top: Math.floor(Math.random() * (min)), left: Math.floor(Math.random() * (max)), width: '200px'}} />
              </div></Draggable>
          ))}
          </div>
          </MobileView>
          <BrowserView>
          <div className="draggable" style={{height: '700px', width: '700px', position: 'relative'}}>
          {person.draggableGallery.map((items, i) => (
            <Draggable key={i} handle=".handle" style={{position: 'relative'}}><div className='handle'>
              <Img fluid={items.fluid} style={{position: 'absolute', top: Math.floor(Math.random() * (d_min)), left: Math.floor(Math.random() * (d_max)), width: '300px'}} />
              </div></Draggable>
          ))}
          </div>
          </BrowserView>
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
              fluid(maxWidth: 480, quality: 80) {
                ...GatsbyContentfulFluid_tracedSVG
               }
            }
          }
        }
      }
  }  
`
