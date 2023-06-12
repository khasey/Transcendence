import React from 'react'
import Score from './Score'
import styles from './Game.module.css'


const Game:React.FC = () => {
  return (
        <div className={styles.all}>
            <div className={styles.game}>

            </div>
            <Score/>
        </div>
  )
}

export default Game