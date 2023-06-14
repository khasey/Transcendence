import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, AvatarGroup } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import styles from './backdrop.module.css';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import FullChannel from './FullChannel';
import EnterText from './EnterText';
import TextSend from './TextSend';
import Link from 'next/link';

type Anchor = 'right';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Backdrop() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);


  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{
            marginLeft:'-20%',
            fontSize:'12px',
            color:'#ffffff6b',
            '&:hover':{
                color:'#f0f8ff'
            }
          }}>CHAT</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {/* {list(anchor)} */}
            <Box className="inside_chat" sx={{
                width:'600px',
                height:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'flex-start',
                alignItems:'center',
                gap:'5px',
                backgroundColor:'black',
                "@media screen and (width < 1500px)":{
                  width:'350px',
                },
            }}>
{/* ############## INSIDE BACKDROP ############### */}
            <div className={styles.channel}>
                <div className={styles.channel_photo}>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Travis Howard" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Cindy Baker" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Agnes Walker" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Trevor Henderson" src="" style={{cursor:'pointer'}}/>
                </AvatarGroup>
                </div>
                <div className={styles.channel_text}>
                    <h3>Friends Online</h3>
                </div>
                <div className={styles.channel_profil}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  variant="dot"
                  >
                  <Link href="/profil">
                  <Avatar alt="Remy Sharp" src="" style={{cursor:'pointer'}}/>
                  </Link>
                </StyledBadge>
                </div>  
            </div>
{/* ############## INSIDE TEXT AREA ############### */}
            <div className={styles.channel_tchat}>
              <div className={styles.title}>
                <FullChannel/>
              </div>
              <div className={styles.tchat}>
                <TextSend/>
              </div>
              <div className={styles.enter_text}></div>
                  <EnterText/>
            </div>   
            </Box>

          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}