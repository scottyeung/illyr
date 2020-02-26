import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ReactFullpage from '@fullpage/react-fullpage';
import BackgroundImage from 'gatsby-background-image'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const SEL = 'custom-section';
const SLIDE = 'slide';
const SECTION_SEL = `.${SEL}`;
const SLIDE_SEL = `.${SLIDE}`;

class RootIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      muted: true
    };
  }

  afterLoad(origin, destination) {
      this.setState({currentIndex: destination.index});      
  }

  handleAddSection() {
    this.setState(state => {
      const { fullpages } = state;
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random(),
      });

      return {
        fullpages: [...fullpages],
      };
    });
  }

  handleRemoveSection() {
    this.setState(state => {
      const { fullpages } = state;
      const newPages = [...fullpages];
      newPages.pop();

      return { fullpages: newPages };
    });
  }

  moveSectionDown() {
    window.fullpage_api.moveSectionDown();
  }

  render() {

    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulCv.edges')
    const projects = get(this, 'props.data.allContentfulProjects.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const ref = React.createRef();

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#000' }}>
          <Helmet title={siteTitle} />

          <ReactFullpage
          licenseKey='' 
          navigation
          scrollOverflow={true}
          sectionSelector={SECTION_SEL}
          slideSelector={SLIDE_SEL}
          slidesNavigation={true}
          afterLoad={this.afterLoad.bind(this)}
          controlArrows={ isMobile ? false : true }
          render={comp => (
            <ReactFullpage.Wrapper>
              {projects.map(({ node }, index) => (
                <div key={node.slug} className={SEL}>
                  <BrowserView>
                    <div className="slide">
                      <p className="title">{node.title}</p>
                      <p className='sound'
                        onClick={()=>this.setState({muted:!this.state.muted})}>
                        Sound
                      </p>
                      <Hero
                            data={node} 
                            isPlaying={ index == this.state.currentIndex ? true : false }
                            muted={ this.state.muted }
                      />
                    </div>
                  </BrowserView>
                  <MobileView>
                    <div className="slide"
                          style={{backgroundImage: `url("${node.gallery[0].fluid.src}")`}}>
                      <p className="title">{node.title}</p>
                    </div>
                  </MobileView>
                  <div className="slide">
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: node.description.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                  <div className="slide">
                  {node.gallery.map((items, i) => (
                    <Img key={i} fluid={items.fluid} />
                  ))}
                  </div>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
        />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCv(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulProjects {
      edges {
        node {
          id
          title
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
          gallery {
            fluid(resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
             }
          }
          video
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
