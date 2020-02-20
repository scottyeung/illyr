import React from 'react'
import ReactPlayer from 'react-player'
import Img from 'gatsby-image'

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
  <ReactPlayer url='https://rebecca.inverted-audio.com/videos/encrypt/Brave Echo/playlist.m3u8' 
              config={{
              file: {
                forceHLS: true,
                hlsOptions: {
                  xhrSetup: function(xhr, url) {
                    xhr.withCredentials = true
                    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                  },
                }
              }
            }}
    />
    {/* <track kind="captions" srcLang="en" src={Captions} /> */}
    <Img className={styles.heroImage} alt={data.name} fluid={data.heroImage.fluid} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <p>{data.shortBio.shortBio}</p>
    </div>
  </div>
)
