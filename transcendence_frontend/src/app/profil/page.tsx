'use client'
import React from 'react'
import Layout from 'src/component/Layout'
import { Avatar, Box, Button, ButtonGroup, Switch, TextField, Typography, alpha, styled } from '@mui/material'
import { pink } from '@mui/material/colors';
import styles from './profil.module.css'
import ScoreInfo from 'src/component/scoreboard/ScoreInfoMiddle';

const buttons = [
  <Button key="one">Last Matchs</Button>,
  <Button key="two">Last Week</Button>,
  <Button key="three">Last Month</Button>,
]; 



const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'white',
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
    "@media screen and (width < 1000px)":{
      fontSize:'10px',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'white',
  },
}));

const Profil: React.FC = () => {

  const [name, setName] = React.useState('bitedouce');

  return (
    <Layout>
    <div className={styles.all}>
      <div className={styles.all_score}>
        <div className={styles.all_score_avatar}>

          <Avatar alt="Remy Sharp" src="" 
          sx={{
            "@media screen and (width < 1500px)":{
              width:'70px',
              height:'70px',
            },
            "@media screen and (width < 1000px)":{
              width:'60px',
              height:'60px',
            },
            width: '80px',
            height: '80px',
            marginLeft: '5%',
            marginRight:'5%',
          }} />

        <TextField
          sx={{
            "@media screen and (width < 1000px)":{
              marginRight:'15vw',
            },
            "@media screen and (width < 1500px) and (width > 1000px)":{
              marginRight:'35vw',
            },
            marginRight:'45vw',
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          inputProps={{
            style: { color: "white" },
          }}
          InputProps={{
            sx: {
              "@media screen and (width < 1000px)":{
                width:'110px',
                height:'40px',
              },
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "1px solid white",
              },
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid white",
                },
              },
            },
          }}
          id="outlined-controlled"
          label="USERNAME"
          value={name}
          size='medium'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />

          <Typography variant="h6" gutterBottom sx={{
            "@media screen and (width < 1000px)":{
              fontSize:'12px',
              // margin:'10px',
            },
            "@media screen and (width < 1500px) and (width > 1000px)":{
              fontSize:'16px',
            },
            margin:'0',
            color:'white',
          }}>
             Enable 2fa
          </Typography>
          <PinkSwitch defaultChecked sx={{
            // margin:'10px'
            }} />
        </div>
            
        <div className={styles.all_score_score} >
          <div className={styles.all_score_score_date}>
           
          </div>
          <div className={styles.all_score_score_stats}>
              <ScoreInfo />
          </div>
        </div>
        <div className={styles.all_score_ladder}>
              <div className={styles.all_score_ladder_logo}>
                <p className={styles.all_score_ladder_logo_lvl}>1</p>              
                <img src="./images/lvl2.png" alt="" className={styles.all_score_ladder_logo_img} />
              </div>
              <Box className={styles.all_score_ladder_exp}>
                <p className={styles.all_score_ladder_exp_text}>
                  YOUR EXP:
                </p>
                <div className={styles.all_score_ladder_exp_bar}>

                </div>
              </Box>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Profil