import React from 'react'
import ReactPlayer from 'react-player'
import styles from './hero.module.css'

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase() // Detects iOS devices
  return /iphone|ipad|ipod/.test(userAgent)
}

export default ({ data, isPlaying, muted }) => {

  let video

  return (
    <div className={styles.hero}>
      <ReactPlayer
        ref={el => video = el}
        onReady={() => {video.getInternalPlayer().setAttribute('data-keepplaying', '')}}
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
    </div>
  )
}

