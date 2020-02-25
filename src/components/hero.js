import React from 'react'
import ReactPlayer from 'react-player'

// import LazyLoad from 'react-lazyload';
import Img from 'gatsby-image'

import styles from './hero.module.css'

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase() // Detects iOS devices
  return /iphone|ipad|ipod/.test(userAgent)
}

export default ({ data, isPlaying, muted }) => (
  <div className={styles.hero}>
    <ReactPlayer
      width="100%"
      height="100vh" 
      muted={muted} playing={isPlaying} loop
      crossOrigin="anonymous"
      url={data.video} 
      config={{
        file: {
          forceHLS: !isIos,
          forceVideo: true,
        }
      }}
    />
    {/* <track kind="captions" srcLang="en" src={Captions} /> */}
    {/* <Img className={styles.heroImage} alt={data.name} fluid={data.heroImage.fluid} /> */}
    {/* <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p>{data.shortBio.shortBio}</p>
    </div> */}
  </div>
)
