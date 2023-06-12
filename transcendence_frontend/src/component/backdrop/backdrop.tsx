import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import styles from './backdrop.module.css';
import Channel from './Channel';
import AddUser from './AddUser';
import CreateChannel from './CreateChannel';

type Anchor = 'right';

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
                {/* ----------------title------------ */}
                <Box className={styles.inside_chat_title}>
                    <div className={styles.inside_chat_title_text} >CHAT</div>
                </Box>
                {/* ------------------profil-section---------------- */}
                <Box className={styles.inside_chat_profil}>
                
                </Box>
                {/* -----------------------icon menu------------------------- */}
                <Box className={styles.inside_chat_icon}
                sx={{
                    "@media screen and (width < 1500px)":{
                      gap:'60px',
                    },
                }}>
                    <Diversity3Icon className={styles.inside_chat_icon_1} onClick={() => setSelectedIcon('diversity')} />
                    <PersonAddIcon className={styles.inside_chat_icon_2} onClick={() => setSelectedIcon('person')}/>
                    <GroupAddIcon  className={styles.inside_chat_icon_3} onClick={() => setSelectedIcon('group')}/>
                </Box>
                {/* -------------------------chat area------------------------ */}
                <Box className={styles.inside_chat_chatArea} >
                {selectedIcon === 'diversity' && <Channel />}
                {selectedIcon === 'person' && <AddUser />}
                {selectedIcon === 'group' && <CreateChannel />}
                </Box>
            </Box>

          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}