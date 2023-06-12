'use client'
import React from 'react'
import styles from './login.module.css'
import { Avatar, Box, Button, Stack, TextField, styled } from '@mui/material';
import Link from 'next/link';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles-engine";
import { useCallback } from 'react';
// import { AccountCircle } from '@mui/icons-material';


const Profil: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
}, []);
  return (
    <div className={styles.profil}>
      <Stack direction='column'  className={styles.profil_in}>
        <Stack direction='column' spacing={3} className={styles.profil_in2} sx={{
          gap:'0%',
        }}>
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center'}}>
          <Avatar alt="Kevin" src="/static/images/avatar/1.jpg" 
          sx={{
            "@media screen and (width < 1500px)":{
              width:'80px',
              height:'80px',
            },
            backgroundColor: 'white',
            width:'90px',
            height:'90px',
          
          }}/>
          <div className="profil_in_name">
            <p className="profil_in_name_text" style={{fontSize:'20px', marginTop:'15%'}}>
              kthierry
            </p>
          </div>
        </Box>
        <Box>
          <TextField label="username"
          type="Text"
          margin="none"
          InputLabelProps={{
            style: { color: "white" },
          }}
          inputProps={{
            style: { color: "white" },
          }}
          sx={{
            "@media screen and (width < 1500px)":{
               width: 220,
            },
            ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
              color: "white",
            },
          }}
          InputProps={{
            sx: {
              "@media screen and (width < 1500px)":{
                fontSize:'65%',
              },
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "2px solid white",
              },
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid white",
                },
              },
            },
          }}
          size="medium"
          variant="outlined"
          fullWidth
           />
        </Box>
          <Link  href='/intro' style={{textDecoration:'none'}}>
            <div className={styles.profile_in2_button}>
              START
            </div>
          </Link>
          
        </Stack>
      </Stack>
      <Particles options={particlesOptions as ISourceOptions} init={particlesInit}/>
    </div>
  )
}

export default Profil