import React from 'react'
import styles from './Channel_choose.module.css'
import { Avatar } from '@mui/material'

function Channel_choose() {
  return (
    <div className={styles.box}>
        <div className={styles.name}>
        <Avatar
            alt="Remy Sharp"
            src=""
            sx={{ width: 64, height: 64 }}
        />
        <p>KTHIERRY</p>
        </div>
    </div>
  )
}

export default Channel_choose