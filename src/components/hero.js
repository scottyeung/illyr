import React from 'react'
import ReactPlayer from 'react-player'
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
          attributes: {
            'data-keepplaying': ''
          }
        }
      }}
    />
  </div>
)


