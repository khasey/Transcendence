import React from 'react'
import styles from './Channel.module.css'
import Channel_choose from './Channel_choose'

function Channel() {
  return (
    <div className={styles.all}>
      <Channel_choose/>
    </div>
  )
}

export default Channel