import React from 'react'
import styles from './ScoreInfoMiddle.module.css'
import { Avatar, Box, Button, ButtonGroup, Typography } from '@mui/material'

const buttons = [
  <Button key="one">Last Matchs</Button>,
  <Button key="two">Last Week</Button>,
  <Button key="three">Last Month</Button>,
]; 

const ScoreInfo : React.FC = () => {
  return (
    <div>
       <Box
              sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop:'-80px',
              '& > *': {
                m: 1.2,
                },
              }}
              >
                <Typography variant="h5" gutterBottom sx={{
                  margin:'0',
                  color:'white',
                }}>
                  SCOREBOARD
                </Typography>
              <ButtonGroup color='info'size="large" aria-label="large button group" sx={{
                margin:'0',
                color:'blue'
              }}>
                {buttons}
              </ButtonGroup>
              <div className={styles.container}>
                <div className={styles.container_text}>
                  <div className={styles.date_heure}>
                    <p>01/01/01</p>
                  </div>
                  <div className={styles.pseudo}>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 50, height: 50 }}
                    />
                    <p>KTHIERRY</p>
                    <p>2</p>
                  </div>
                  <p style={{fontWeight:'700', color:'white'}}>VS</p>
                  <div className={styles.pseudo2}>  
                  <p>2</p>
                  <p>KTHIERRY</p>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 50, height: 50 }}
                    />
                  </div>
                </div>
            </div>
            </Box>
       
    </div>
  )
}

export default ScoreInfo