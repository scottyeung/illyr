import React from 'react'
import ReactPlayer from 'react-player'
import styles from './hero.module.css'

export default ({ data, isPlaying, muted }) => (
  <div className={styles.hero}>
    <ReactPlayer
      width="100%"
      height="100vh"
      autoPlay
      muted={muted} playing={isPlaying} loop
      crossOrigin="anonymous"
      url={data} 
      config={{
        file: {
          forceHLS: true,
          forceVideo: true,
          hlsVersion: '0.13.2',
          attributes: {
            'data-keepplaying': ''
          }
        }
      }}
    />
  </div>
)


