'use client'
import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { Avatar, Box, Button, Stack, TextField, styled } from '@mui/material';
import Link from 'next/link';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles-engine";
import { useCallback } from 'react';
import axios from 'axios';
import { User }  from '../../../../transcendence_backend/src/user/user.entity'; // Assurez-vous que le chemin est correct

// import { AccountCircle } from '@mui/icons-material';


const Profil: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>('http://localhost:4000/user/104440');
        setUser(response.data);
        console.log("rep data = " + response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

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
          <Avatar alt="Kevin" src={user?.imageUrl} 
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
                <p className="profil_in_name_text" style={{ fontSize: '20px', marginTop: '15%' }}>
                 {user?.username}
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