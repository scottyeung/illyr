import React from 'react'
import ReactPlayer from 'react-player'
import Img from 'gatsby-image'

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

import styles from './hero.module.css'

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: '',
    type: 'video/mp4'
  }]
}

export default ({ data }) => (
  <div className={styles.hero}>
  <ReactPlayer
    width="100%"
    height="100vh" 
    muted playing loop
    crossOrigin="anonymous"
    url='https://rebecca.inverted-audio.com/videos/encrypt/Brave Echo/playlist.m3u8' 
    config={{
    file: {
      forceHLS: !isSafari,
      forceVideo: true,
    }
  }}
    />
    {/* <track kind="captions" srcLang="en" src={Captions} /> */}
    {/* <Img className={styles.heroImage} alt={data.name} fluid={data.heroImage.fluid} /> */}
    {/* <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <p>{data.shortBio.shortBio}</p>
    </div> */}
  </div>
)
