import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ReactFullpage from '@fullpage/react-fullpage'
import Styles from './index.css'
import ReactPlayer from 'react-player'
import { BrowserView, MobileView, isSafari } from 'react-device-detect'

const SEL = 'custom-section';
const SLIDE = 'slide';
const SECTION_SEL = `.${SEL}`;
const SLIDE_SEL = `.${SLIDE}`;

class RootIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      muted: false,
      isBTS: false
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
    const projects = get(this, 'props.data.allContentfulProjects.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#000' }}>
          <Helmet title={siteTitle} />
          <MobileView>
          {projects.map(({ node }) => (
            <div key={node.slug} className='project'>
              <p className='title'>{node.title}</p>
              <ReactPlayer       
                width="100%"
                controls
                light={true}
                playsinline
                crossOrigin="anonymous"
                url={node.video}
                config={{
                  file: {
                    forceHLS: !isSafari,
                    forceVideo: true,
                    attributes: {
                      disablePictureInPicture: true,
                      preload: 'none'
                    },
                  }
                }}
              />
            </div>
          ))}
          </MobileView>
          <BrowserView>
          <ReactFullpage
          debug
          licenseKey='' 
          navigation={true}
          navigationTooltips={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']}
          showActiveTooltip={true}
          scrollOverflow={true}
          scrollHorizontally={true}
          sectionSelector={SECTION_SEL}
          slideSelector={SLIDE_SEL}
          slidesNavigation={true}
          afterLoad={this.afterLoad.bind(this)}
          controlArrows={false}
          render={comp => (
            <ReactFullpage.Wrapper>
              {projects.map(({ node }, index) => (
                <div key={node.slug} className={SEL}>
                    <div className="slide">
                      <p className="title">{node.title}</p>
                      <div onClick={()=>this.setState({muted:!this.state.muted})}>
                        <img 
                          className='speaker'
                          src='./speaker.svg'
                        />
                      </div>
                      <Hero
                            data={node.video} 
                            isPlaying={ index == this.state.currentIndex && !this.state.isBTS ? true : false }
                            muted={ this.state.muted }
                      />
                    </div>
                  <div className="slide">
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: node.description.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                
                  {node.gallery && 
                  <div className="slide">
                  {node.gallery.map((items, i) => (
                    <Img key={i} fluid={items.fluid} className={node.gallery.length > 1 ? Styles.multiple : Styles.single} />
                  ))}
                  </div>
                  }
                  {node.zine && <div className="slide">
                    <Img fluid={node.zine.fluid} className={Styles.single} />
                  </div>}
                  {node.behindTheScene && 
                  <div className="slide">
                      <div className='playContainer' onClick={()=>this.setState({isBTS:!this.state.isBTS})}>
                        <img 
                          className={`play ${this.state.isBTS ? "hidden" : "show"}`}
                          src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_play_arrow_48px-512.png'
                        />
                      </div>
                    <Hero data={node.behindTheScene} isPlaying={this.state.isBTS} />
                  </div>}
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
          />
          </BrowserView>
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
    allContentfulProjects(sort: {fields: [projectOrder], order: ASC}) {
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
            fluid(maxWidth: 1280, quality: 90) {
              ...GatsbyContentfulFluid_tracedSVG
             }
          }
          video
          zine {
            fluid(maxWidth: 880, quality: 90) {
              ...GatsbyContentfulFluid_tracedSVG
             }
          }
          behindTheScene
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            childMarkdownRemark {
              html
            }
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
